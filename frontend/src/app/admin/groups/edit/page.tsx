'use client';

import React from 'react';
import Container from '@mui/material/Container';
import WTitle1 from '@/app/components/WTitle1';
import DataGrid from '@/app/admin/components/DataGrid';

export default function EditGroups() {
  return (
    <Container>
      <WTitle1 text="Edit" redText="Groups" />
      <DataGrid />
    </Container>
  );
}
