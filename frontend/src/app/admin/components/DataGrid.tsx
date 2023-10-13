import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
    editable: true,
  },
  {
    field: 'area',
    headerName: 'Area(s)',
    width: 150,
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
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
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
