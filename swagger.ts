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
            statusCode: 200,
            user: {
                uid: "SXn2duju1bS6uXRZBKgXoVbC43D2",
                email: "lucas@email.com",
                password: "1234",
                name: "Lucas",
                created: "19/06/2023, 18:23:02",
                modified: null,
                deleted: null
            }
        },
        AddUser: {
            $email: "lucas@email.com",
            $password: "1234",
            $name: "Lucas"
        },
        CreatedUser: {
            statusCode: 201,
            user: {
                uid: "SXn2duju1bS6uXRZBKgXoVbC43D2",
                email: "lucas@email.com",
                password: "1234",
                name: "Lucas",
                created: "19/06/2023, 18:23:02",
                modified: null,
                deleted: null
            }
        },
        LoginUser: {
            $email: "lucas@email.com",
            $password: "1234"
        },
        LoggedUser: {
            statusCode: 201,
            user: {
                uid: "SXn2duju1bS6uXRZBKgXoVbC43D2",
                name: "Lucas"
            }
        },
        Product: {
            statusCode: 200,
            product: {
                uid: 'SXn2duju1bS6uXRZBKgXoVbC43D2',
                name: "Produto 1",
                amount: 1,
                amountType: "Caixas",
                price: 10.00,
                category: "Peças",
                created: "19/06/2023, 18:23:02",
                modified: null,
                deleted: null
            }
        },
        Products: {
            statusCode: 200,
            products: [
                {
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
                {
                    uid: 'SXn2duju1bS6uXRZBKgXoVbC43D3',
                    name: "Produto 2",
                    amount: 2,
                    amountType: "Caixas",
                    price: 10.00,
                    category: "Peças",
                    created: "19/06/2023, 18:25:02",
                    modified: null,
                    deleted: null
                },
            ]
        },
        AddProduct: {
            $name: "Produto 1",
            $amount: 1,
            $amountType: "Caixas",
            $price: 10.00,
            $category: "Peças"
        },
        CreatedProduct: {
            statusCode: 201,
            product: {
                uid: 'SXn2duju1bS6uXRZBKgXoVbC43D2',
                name: "Produto 1",
                amount: 1,
                amountType: "Caixas",
                price: 10.00,
                category: "Peças",
                created: "19/06/2023, 18:23:02",
                modified: null,
                deleted: null
            }
        },
        UpdateProduct: {
            $uid: 'SXn2duju1bS6uXRZBKgXoVbC43D2',
            $name: "Produto 1",
            $amount: 1,
            $amountType: "Caixas",
            $price: 10.00,
            $category: "Peças"
        },
        UpdatedProduct: {
            statusCode: 201,
            uid: "d17u0PhrETLAGNNHeONP"
        }
    }
}

swaggerAutogen(swaggerFile, endpointRouters, doc);