import dotenv from 'dotenv';

dotenv.config();

export const JwtConfig = {
  secret: process.env.JWT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: 'HS256',
};

export default JwtConfig;
