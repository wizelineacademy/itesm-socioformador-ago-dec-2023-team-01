'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import WTitle1 from '@/app/components/WTitle1';

export default function Wizeliners() {
  const router = useRouter();
  const userId = 'google-oauth2|110273456643017657010';
  return (
    <>
      <WTitle1 text="Wizeliners." redText="" />
      <div>
        <button type="button" onClick={() => router.push(`wizeliners/edit?userId=${userId}`)}>
          Click me
        </button>
      </div>
    </>
  );
}
