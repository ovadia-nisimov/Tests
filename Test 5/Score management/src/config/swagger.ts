import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API for blog platform',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',  
        },
      },
    },
    security: [
      {
        cookieAuth: [], 
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
