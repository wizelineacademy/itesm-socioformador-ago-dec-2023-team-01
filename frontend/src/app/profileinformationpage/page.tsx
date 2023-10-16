'use client';

import React from 'react';
import UserProfile from '../components/ProfileInformationPage';

export default function ShowProfileInformation() {
  return (
    <div>
      <UserProfile
        firstName="Thomas"
        lastName="Anderson"
        email="thomasAnderson@tec.mx"
        areas="Software Engineer"
        currentWizecoins="174"
        monthlyWizecoins="300"
      />
    </div>
  );
}
