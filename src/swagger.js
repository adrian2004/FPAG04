const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentação API Interfocus',
            version: '1.0.0',
            description: 'Documentação da API de autenticação',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        servers: [
            {
                url: process.env.ENVIRONMENT === 'dev'
                    ? 'http://localhost:5000'
                    : 'https://interfocus.labs.unimar.br/',
            },
        ],
    },
    apis: ['./src/routes/**/*.js'], // Inclua aqui o caminho onde as rotas estão definidas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
