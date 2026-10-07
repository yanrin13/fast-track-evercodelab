import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.PORT;

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
        url: `http://localhost:${port}`,
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
  },
  apis: ["./src/routes/*.ts", "./src/routes/**/*.ts", "./src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
