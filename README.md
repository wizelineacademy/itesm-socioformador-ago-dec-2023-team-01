# WizePrompt


## Technologies Used - Backend
- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Swagger](https://swagger.io/) - For API documentation
  
## Technologies Used - Frontend
- [Next.js](https://nextjs.org/)
  
## Technologies Used CI/CD
- [Jenkins](https://www.jenkins.io/) - For CI/CD
- [ESLint](https://eslint.org/) - For code linting

## Getting Started locally
### Prerequisites 
- [Node.js](https://nodejs.org/) installed
- [PostgreSQL](https://www.postgresql.org/) installed / deployed and running
### Installation
In your terminal of choice run the following commands in a dedicated folder

- git clone https://github.com/wizelineacademy/itesm-socioformador-ago-dec-2023-team-01.git
- cd itesm-socioformador-ago-dec-2023-team-01
  
Once in itesm-socioformador-ago-dec-2023-team-01 run the following commands:
- cd backend
- npm install
- npx prisma migrate dev
- npx prisma generate
- npm run dev
- cd ..
- cd frontend
- npm install
- npm run build
- npm run start
This should install all the neccessary dependencies

**Backend Environment Variables:**

- **PORT:** Indicates the port at which the backend should run.

- **DATABASE_URL:** Points to your PostgreSQL database.

- **BASE_URL:** Represents the base localhost URL, including the port.

- **CLIENT_ID:** Auth0 client ID (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **ISSUER_BASE_URL:** Auth0 issuer base URL (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **CLIENT_SECRET:** Auth0 client secret (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **AUTH0_AUDIENCE:** Auth0 audience (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **JWT_SECRET:** Random set of numbers and letters used to generate the JWT token.

**Frontend Environment Variables:**

- **AUTH0_SECRET:** Randomly generated secret key (provided by Auth0).

- **AUTH0_BASE_URL:** Base URL for Auth0.

- **AUTH0_ISSUER_BASE_URL:** Base URL issued by Auth0 (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **AUTH0_CLIENT_ID:** Client ID (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **AUTH0_CLIENT_SECRET:** Random combination of numbers and letters (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **AUTH0_AUDIENCE:** Auth0 audience (provided by Auth0). Obtain this from your Auth0 dashboard: [Auth0 Dashboard](https://auth0.com/)

- **PUBLIC_OPENAI_API_KEY:** OpenAI API key (provided by OpenAI).

- **NEXT_PUBLIC_API_URL:** Base URL, including localhost and port number.

## Folder Structure
```
|-- itesm-socioformador...
|   |-- backend/                  # Backend code
|       |-- src/                  # Source code
|           |-- server.ts         # Initializing backend server
|           |-- configs/          
|               |-- auth0-config.ts  # Auth0 configuration
|               |-- jwt-config.ts    # JSON Web Token configuration
|           |-- middlewares/      
|               |-- authMiddleware.ts  # Authentication middleware
|               |-- errorMiddleware.ts # Error catch middleware
|           |-- modules/          
|               |-- user/         
|                   |-- controllers/   # Controllers for user module
|                   |-- models/        # Models for user module
|                   |-- services/      # Services for user module
|                   |-- repository/    # Direct interaction with user db table
|           |-- routes/          
|               |-- index.ts
|           |-- shared/          
|           |-- utils/            
|   
|   |-- frontend/                 # Frontend code
|       |-- components/           # Reusable UI components
|       |-- pages/                # Next.js pages
|       |-- public/               # Public assets
|       |-- styles/               # CSS styles
|
|   |-- ...                       # Additional files and folders
|-- ...
```
