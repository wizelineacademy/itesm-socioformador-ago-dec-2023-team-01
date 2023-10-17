'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Styles from './DataGrid.module.css';

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
];

const rows = [
  {
    id: 1, username: 'Thomas Anderson', area: 'Full Stack', idAdmin: 'Yes', wizecoins: 400,
  },
  {
    id: 2, username: 'Andrew Window', area: 'Marketing', idAdmin: 'No', wizecoins: 200,
  },
  {
    id: 3, username: 'Toby Foster', area: 'Design', idAdmin: 'No', wizecoins: 100,
  },
  {
    id: 4, username: 'Forest Hill', area: 'Full Stack', idAdmin: 'No', wizecoins: 50,
  },
  {
    id: 5, username: 'Samuel Acosta', area: 'Front End', idAdmin: 'Yes', wizecoins: 800,
  },
  {
    id: 6, username: 'Nicolas Aguirre', area: 'Back End', idAdmin: 'Yes', wizecoins: 50,
  },
  {
    id: 7, username: 'Pablo Erhard', area: 'Full Stack', idAdmin: 'Yes', wizecoins: 200,
  },
  {
    id: 8, username: 'Alejandro Lizarraga', area: 'QA', idAdmin: 'Yes', wizecoins: 300,
  },
  {
    id: 9, username: 'Diego Esparza', area: 'Project Manager', idAdmin: 'Yes', wizecoins: 500,
  },
  {
    id: 10, username: 'Leonardo Gonzalez', area: 'Front End', idAdmin: 'Yes', wizecoins: 1200,
  },
];

export default function DataTable() {
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
