'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WTitle1 from '@/app/components/WTitle1';
import DataGrid from '@/app/admin/components/DataGrid';
import Popup from '@/app/components/Popup';

export default function EditGroups() {
  const totalWizecoins = 2500;
  const totalWizeliners = 10;
  const [groupName, setGroupName] = useState('Software Engineers');
  const [isEditing, setIsEditing] = useState(false);

  const handleGroupNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setGroupName(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGoodButtonClick = () => {
    handleClosePopup();
  };

  return (
    <Container>
      <Box marginBottom={3}>
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Box>
            <WTitle1 text="Edit" redText=" Groups" />
            <Paper
              sx={{
                marginTop: 1,
                padding: '10px',
                width: '100%',
                backgroundColor: '#111823',
                borderRadius: '20px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box display="flex" alignItems="center" marginLeft={1}>
                {isEditing ? (
                  <input
                    value={groupName}
                    onChange={handleGroupNameChange}
                    onBlur={toggleEditing}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#E93D44',
                      fontWeight: 'bold',
                    }}
                  >
                    {groupName}
                  </Typography>
                )}
                <Box marginLeft={13}>
                  <EditIcon
                    style={{
                      cursor: 'pointer',
                      color: '#ffffff',
                    }}
                  />
                  {' '}
                </Box>
              </Box>
            </Paper>
          </Box>

          <Paper
            sx={{
              padding: '10px',
              width: '30%',
              backgroundColor: '#111823',
              borderRadius: '20px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  color: '#ffffff',
                  borderColor: '#E93D44',
                  borderRadius: '20px',
                  '&:hover': {
                    borderColor: 'red',
                  },
                }}
                onClick={handleOpenPopup}
              >
                Remove
              </Button>
              <Popup
                title={[
                  'Remove ',
                  'Wizeliner',
                ]}
                content={[
                  'You are about to ',
                  'remove Thomas Anderson ',
                  'from the ',
                  'group ',
                  ', proceed?',
                ]}
                badButtonTitle="Cancel"
                goodButtonTitle="Remove"
                open={isPopupOpen}
                onClose={handleClosePopup}
                onGoodButtonClick={handleGoodButtonClick}
              />
              <Link href="/admin/groups/edit/add" passHref>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    color: '#ffffff',
                    borderColor: '#4BE93D',
                    borderRadius: '20px',
                    '&:hover': {
                      borderColor: 'green',
                    },
                    '& .MuiTouchRipple-root span': {
                      backgroundColor: '#4BE93D',
                    },
                  }}
                >
                  <AddIcon />
                  New Member
                </Button>
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={1}
              marginRight={1}
            >
              <Box
                sx={{
                  width: '50%',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #4D545D',
                  borderRadius: '10px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}
                >
                  {totalWizeliners}
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}
              >
                Wizeliners
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginRight={1}
            >
              <Box
                sx={{
                  width: '50%',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #4D545D',
                  borderRadius: '10px',
                }}
              >
                <Box
                  sx={{
                    marginRight: '5px',
                  }}
                >
                  <Image
                    src="/wizecoin.svg"
                    alt="Wizecoin Icon"
                    width={12}
                    height={12}
                    layout="fixed"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#4BE93D',
                  }}
                >
                  {totalWizecoins}
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}
              >
                Wizecoins
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      <DataGrid />
    </Container>
  );
}
