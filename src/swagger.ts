import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Evercode Backend API",
      version: "1.0.0",
      description: "API для отслеживания криптовалют",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // глобальную security убрали — теперь она только на нужных эндпоинтах
  },
  apis: ["./src/routes/*.ts", "./src/routes/**/*.ts", "./src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
