'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WTitle1 from '@/app/components/WTitle1';
import { fetchUsers } from '@/store/slices/users';

export default function Wizeliners() {
  const { usersInfo } = useSelector((store:any) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [usersInfo, dispatch]);

  return <WTitle1 text="Wizeliners." redText="" />;
}
