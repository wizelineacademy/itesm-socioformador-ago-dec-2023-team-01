const swaggerAutogen = require('swagger-autogen')();

const doc = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "WizePrompt Web API",
        "description": "WizePrompt Web API for WizePrompt Web Application. Developed by CoastLine Team.",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    }
};

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);