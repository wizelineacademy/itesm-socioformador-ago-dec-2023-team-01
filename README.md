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
- cd ..
- cd frontend
- npm install
This should install all the neccessary dependencies

### Environment Variables Backend
PORT -> This should indicate the port the backend should run at

DATABASE_URL -> This points to your postgres database

BASE_URL -> This represents the base localhost url including the port

CLIENT_ID -> This represents auth0 client ID (provided by auth0)

ISSUER_BASE_URL -> This represents auth0 issuer base url (provided by auth0)

CLIENT_SECRET -> This represents auth0 client secret (provided by auth0)

AUTH0_AUDIENCE -> This represents auth0 audience (provided by auth0)

JWT_SECRET -> This represent a random set of numbers and letters that generate the JWT token

### Environment Variables Frontend
AUTH0_SECRET -> This represent a random generated secret key (provided by auth0)

AUTH0_BASE_URL -> This represent the base url for auth0

AUTH0_ISSUER_BASE_URL -> This represent the base url issued by auth0 (provided by auth0)

AUTH0_CLIENT_ID -> This represent the client ID (provided by auth0)

AUTH0_CLIENT_SECRET -> This represent a random number of numbers and letters (provided by auth0)

AUTH0_AUDIENCE -> This represents auth0 audience (provided by auth0)

PUBLIC_OPENAI_API_KEY -> This represents the openAI api key (provided by openAI)

NEXT_PUBLIC_API_URL -> This represent base url including localhost and port number

## Folder Structure
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

