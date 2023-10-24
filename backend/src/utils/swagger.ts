import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'WizePrompt Web API',
      description:
        'WizePrompt Web API for WizePrompt Web Application. Developed by CoastLine Team.',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
  },
  apis: ['./src/modules/**/*.ts', './src/shared/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.info(`Swagger UI available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
