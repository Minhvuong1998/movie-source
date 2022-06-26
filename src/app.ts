import express from 'express';
import router from './routers';
import errorMiddleware from './middleware/errorMiddleware';
import errorNotFound from './middleware/errorNotFound';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0'
    }
  },
  apis: ['**/swagger/**/*.yaml']
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);
app.use('/v1/', router);
app.use(errorMiddleware);
app.use(errorNotFound);

export default app;
