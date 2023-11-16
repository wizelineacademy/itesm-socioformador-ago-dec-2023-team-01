'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Styles from './DataGrid.module.css';
import { fetchUsers } from '@/services/usersService';
import { fetchWizelinersInGroup, addUserToGroup, removeUserToGroup } from '@/services/groupService';

export default function DataTable({ groupId }:{ groupId:string }) {
  const [rows, setWizeliners] = useState<any[]>([]);
  const [change, setChange] = useState(true);
  const handleRefetch = () => {
    setChange((prevValue) => !prevValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wizelinersData = await fetchUsers();
        const wizelinersInGroupData = await fetchWizelinersInGroup(groupId);
        setWizeliners(wizelinersData.map((user:any) => ({
          id: user.id,
          username: user.fullName,
          area: 'To be determined',
          idAdmin: 'Yes',
          wizecoins: 400,
          add: {
            inGroup: wizelinersInGroupData.some((groupUser:any) => groupUser.id === user.id),
            userId: user.id,
            groupId,
            refetch: handleRefetch,
          },
        })));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 300,
      editable: false,
    },
    {
      field: 'area',
      headerName: 'Area(s)',
      width: 200,
      editable: false,
    },
    {
      field: 'idAdmin',
      headerName: 'Is Admin',
      width: 130,
      editable: false,
    },
    {
      field: 'wizecoins',
      headerName: 'Wizecoins',
      width: 110,
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
      field: 'add',
      headerName: 'Add Wizeliner',
      width: 200,
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
          {!params.value.inGroup
            ? (
              <Button
                onClick={
                  async () => {
                    console.log(params.value);
                    await addUserToGroup(params.value.groupId, params.value.userId);
                    params.value.refetch();
                  }
                }
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
                Add Wizeliner
              </Button>
            )
            : (
              <Button
                onClick={
                  async () => {
                    console.log(params.value);
                    await removeUserToGroup(params.value.groupId, params.value.userId);
                    params.value.refetch();
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
            )}
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
  ];

  return (
    <Box sx={{ height: 400, width: '100%', overflow: 'hidden' }}>
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
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
