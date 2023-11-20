'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Stack,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import { useRouter } from 'next/navigation';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { VariantType, enqueueSnackbar } from 'notistack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteGroup } from '@/services/groupService';
import Popup from '@/app/components/Popup';
import { GroupProps } from './types';

Chart.register(ArcElement);

export default function Group({
  id,
  title,
  members,
  moneySpent,
  data,
  toggle,
}: GroupProps) {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();

  const showNotification = (variant: VariantType, groupName:string, action:string) => {
    enqueueSnackbar(`${action} ${groupName}`, { variant });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = () => {
    const groupId = id;
    const searchParams = new URLSearchParams();
    searchParams.append('id', groupId.toString());
    searchParams.append('groupTitle', title.toString());
    router.push(`/admin/groups/edit?${searchParams.toString()}`);
  };

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(id);
      handleClosePopup();
      handleClose();
      toggle();
      showNotification('error', title.toString(), 'Deleted group ');
    } catch (error) {
      console.log(error);
    }
  };

  const open = Boolean(anchorEl);
  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: any) {
      const { ctx } = chart;

      ctx.save();
      ctx.font = '20px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `${data.datasets[0].data[0]}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };

  return (
    <>
      <Popup
        title={['Delete', 'Group.']}
        content={['You are about to delete', ` ${title}`, '. Do you wish to proceed?']}
        badButtonTitle="Cancel"
        goodButtonTitle="Confirm"
        open={isOpen}
        onClose={handleClosePopup}
        onGoodButtonClick={handleDeleteGroup}
      />
      <Paper
        elevation={8}
        sx={{
          width: '250px',
          height: '200px',
          borderRadius: '20px',
          bgcolor: '#102A43',
          padding: '10px',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            sx={{
              display: 'flex',
              bgcolor: '#111823',
              borderRadius: '50%',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CodeIcon sx={{ color: 'white' }} />
          </Box>
          <Typography
            variant="h5"
            color="white"
            paddingLeft="10px"
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Tooltip title="Options">
            <IconButton
              sx={{ color: 'white' }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleNavigation}>Edit</MenuItem>
            <MenuItem onClick={handleOpenPopup}>Delete</MenuItem>
          </Menu>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack gap={0}>
            <Typography color="white" fontWeight="bold" textAlign="center">
              <span>
                {members.toString()}
              </span>
              {' wizeliners'}
            </Typography>
            <Box>
              <Typography
                fontWeight="bold"
                textAlign="center"
                fontSize="23px"
              >
                <span>
                  $
                  {moneySpent.toString()}
                  {' USD'}
                </span>
              </Typography>
              <Typography
                sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}
              >
                This month
              </Typography>
            </Box>
          </Stack>
          <Box width="100px" margin="auto">
            <Doughnut data={data} plugins={[textCenter]} />
            <Typography
              sx={{ paddingTop: '10px', color: 'rgba(255,255,255,0.4)' }}
            >
              Tokens Used
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
