import { NextResponse } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0';

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const { accessToken } = await getAccessToken();
  return NextResponse.json({ foo: accessToken });
}
