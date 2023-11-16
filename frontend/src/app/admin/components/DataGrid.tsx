'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import { VariantType, enqueueSnackbar } from 'notistack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { fetchWizelinersInGroup, removeUserToGroup } from '@/services/groupService';
import Popup from '@/app/components/Popup';
import Styles from './DataGrid.module.css';

export default function DataTable({ groupId, wizeCount }:{ groupId: string, wizeCount:Function }) {
  const [usersGroup, setUsersGroup] = useState([]);
  const [totals, setTotals] = useState({ totalWizeCoins: 0, totalUsers: 0 });
  const [change, setChange] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState<string[]>([]);
  const [currUser, setCurrUser] = useState('');
  const [currName, setCurrName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersInGroup = await fetchWizelinersInGroup(groupId);
        setUsersGroup(usersInGroup);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [groupId, change]);

  useEffect(() => {
    const { totalWizeCoins, totalUsers } = usersGroup.reduce(
      (accumulator, user:any) => ({
        totalWizeCoins: accumulator.totalWizeCoins + user.wizecoins,
        totalUsers: accumulator.totalUsers + 1,
      }),
      { totalWizeCoins: 0, totalUsers: 0 },
    );
    setTotals({ totalWizeCoins, totalUsers });
    console.log('this should be smth', totals);
    wizeCount({ totalWizeCoins, totalUsers });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersGroup]);

  const showNotification = (variant: VariantType, user:string, action:string) => {
    enqueueSnackbar(`${action} ${user}`, { variant });
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGoodButtonClick = () => {
    removeUserToGroup(groupId, currUser);
    setChange(!change);
    handleClosePopup();
    showNotification('error', currName, 'Removed');
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 250,
      editable: true,
    },
    {
      field: 'area',
      headerName: 'Area(s)',
      width: 200,
      editable: true,
    },
    {
      field: 'idAdmin',
      headerName: 'Is Admin',
      width: 130,
      editable: true,
    },
    {
      field: 'wizecoins',
      headerName: 'Wizecoins',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          color="#4BE93D"
        >
          <Box
            sx={{ marginRight: '5px' }}
          >
            <Image
              src="/wizecoin.svg"
              alt="Wizecoin Icon"
              width={10}
              height={10}
              layout="fixed"
            />
          </Box>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'view',
      headerName: 'View Profile',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              textTransform: 'none',
              backgroundColor: '#E93D44',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(233, 61, 68, 0.7)',
              },
            }}
            onClick={() => {
              console.log(`Viewing user ${params.row.id}`);
            }}
          >
            View
          </Button>
        </Box>
      ),
    },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Button
            onClick={
              async () => {
                setCurrUser(params.row.id);
                setCurrName(params.row.username);
                setPopupText(['You are about to ', `remove ${params.row.username}`, ' from the ', 'group', ', proceed?']);
                handleOpenPopup();
              }
            }
            variant="outlined"
            sx={{
              textTransform: 'none',
              color: '#FFF',
              borderColor: '#E93D44',
              borderRadius: '20px',
              '&:hover': {
                borderColor: 'red',
              },
              '& .MuiTouchRipple-root span': {
                backgroundColor: '#4BE93D',
              },
            }}
          >
            <RemoveIcon />
            Remove
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%', overflow: 'hidden' }}>
      <Popup
        title={[
          'Remove ',
          'Wizeliner',
        ]}
        content={popupText}
        badButtonTitle="Cancel"
        goodButtonTitle="Remove"
        open={isPopupOpen}
        onClose={handleClosePopup}
        onGoodButtonClick={handleGoodButtonClick}
      />
      <DataGrid
        className={Styles.MenuSpan}
        sx={{
          backgroundColor: '#111823',
          fontWeight: 'bold',
          borderColor: '#1D293A',
          '& .MuiCheckbox-root': {
            color: 'white',
          },
          '& .MuiDataGrid-columnHeader .MuiSvgIcon-root': {
            color: 'white',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'white',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            color: 'white',
            border: 'none',
            borderBottom: '1px solid #111823',
            borderRight: '1px solid #111823',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: '#1D293A',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(29, 41, 58, 0.8)',
          },
          '& .MuiTablePagination-root': {
            backgroundColor: '#111823',
            color: 'white',
          },
          '& .MuiDataGrid-footerContainer': {
            color: 'white',
          },
          '& .MuiTablePagination-actions': {
            '& button': {
              color: 'white',
            },
            '& button.Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          '& .MuiTablePagination-select': {
            color: 'white',
          },
        }}
        rows={usersGroup}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
