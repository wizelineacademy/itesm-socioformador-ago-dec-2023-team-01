'use client';

import React from 'react';
import UserProfile from '../components/ProfileInformationPage';

export default function ShowProfileInformation() {
  return (
    <div>
      <UserProfile
        name="Thomas Anderson"
        email="thomasAnderson@tec.mx"
        areas="Software Engineer"
        profileSrc="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2015/11/albert-einstein-retrato-scaled.jpg?fit=2560%2C1985&quality=50&strip=all&ssl=1"
        currentWizecoins="174"
        monthlyWizecoins="300"
      />
    </div>
  );
}
