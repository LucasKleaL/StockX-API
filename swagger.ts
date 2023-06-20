const swaggerAutogen = require('swagger-autogen')()

const endpointRouters = ['./src/routes/UserRouter.ts', './src/routes/ProductRouter.ts']
const swaggerFile = './swagger.json';

const doc = {
    swagger: "2.0",
    info: {
        description: "This is the Swagger Documentation of StockX server API",
        version: "1.0.0",
        title: "StockX API"
    },
    host: "localhost:3001",
    basePath: "/api",
    schemes: ["http", "https"],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "User",
            descriptions: "User endpoints",
        },
        {
            name: "Product",
            descriptions: "Products endpoints",
        }
    ],
    definitions: {
        User: {
            uid: "SXn2duju1bS6uXRZBKgXoVbC43D2",
            email: "lucas@email.com",
            password: "1234",
            name: "Lucas",
            created: "19/06/2023, 18:23:02",
            modified: null,
            deleted: null
        },
        AddUser: {
            $email: "lucas@email.com",
            $password: "1234",
            $name: "Lucas"
        },
        LoginUser: {
            $email: "lucas@email.com",
            $password: "1234"
        },
        Product: {
            uid: 'SXn2duju1bS6uXRZBKgXoVbC43D2',
            name: "Produto 1",
            amount: 1,
            amountType: "Caixas",
            price: 10.00,
            category: "Peças",
            created: "19/06/2023, 18:23:02",
            modified: null,
            deleted: null
        },
        AddProduct: {
            $name: "Produto 1",
            $amount: 1,
            $amountType: "Caixas",
            $price: 10.00,
            $category: "Peças"
        },
        UpdateProduct: {
            $uid: 'SXn2duju1bS6uXRZBKgXoVbC43D2',
            $name: "Produto 1",
            $amount: 1,
            $amountType: "Caixas",
            $price: 10.00,
            $category: "Peças"
        }
    }
}

swaggerAutogen(swaggerFile, endpointRouters, doc);