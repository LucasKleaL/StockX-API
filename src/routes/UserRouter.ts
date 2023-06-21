import express, { RequestHandler } from 'express';
import UserRepository from '../repositories/UserRepository';
import { celebrate, Joi } from 'celebrate';
import User from '../models/User';

const userRouter = express.Router();
const userRepository = new UserRepository();


userRouter.post('/users',
    celebrate({
        body: Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
            name: Joi.string().required().max(50),
        })
    }),
    (async (req, res) => {
        // #swagger.tags = ['User']
        // #swagger.description 'Endpoint to add a user.'
        try {
            /* #swagger.parameters['user'] = {
                in: 'body',
                description: 'User data to add.',
                required: true,
                schema: { $ref: "#/definitions/AddUser" }
            } */
            const user: User = req.body;
            const result = await userRepository.add(user);
            /* #swagger.responses[201] = { 
                    schema: { $ref: "#/definitions/CreatedUser" },
                    description: 'Created user object.' 
            } */
            res.status(201).json({ codeStatus: 201, user: result })
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error code:', error.message);
                if (error.message.includes('The email address is already in use by another account.')) {
                    return res.status(409).json({ statusCode: 409, message: "E-mail already exists" });
                }
            }
            return res.status(500).json({ statusCode: 500, error: "Failed to add user" });
        }
    }) as RequestHandler
);

userRouter.post('/users/login',
    // #swagger.tags = ['User']
    // #swagger.description 'Endpoint to login a user.'
    celebrate({
        body: Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8)
        })
    }),
    (async (req, res) => {
        try {
            /* #swagger.parameters['user'] = {
                in: 'body',
                description: 'User data to login.',
                required: true,
                schema: { $ref: "#/definitions/LoginUser" }
            } */
            const user: User = req.body;

            const loggedUser = await userRepository.login(user);
            if (loggedUser != null) {
                /* #swagger.responses[201] = { 
                    schema: { $ref: "#/definitions/LoggedUser" },
                    description: 'Logged user object.' 
                } */    
                return res.status(201).json({ statusCode: 201, user: loggedUser });
            } else {
                return res.status(400).json({ statusCode: 400, user: null });
            }
        } catch (error) {
            console.error('Error on user login:', error);
            return res.status(500).json({ statusCode: 500, error: 'Failed to login user' });
        }
    }) as RequestHandler
);

userRouter.get('/users/:uid', 
    (async (req, res) => {
        // #swagger.tags = ['User']
        // #swagger.description 'Endpoint to get a user by id.'
        try {
            const uid = req.params.uid;
            const user = await userRepository.get(uid);
            if (user != null) {
                /* #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/User" },
                    description: 'Found user object.' 
                } */
                return res.status(200).json({ statusCode: 200, user: user });
            } else {
                return res.status(404).json({ statusCode: 404, user: user });
            }
        } catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(500).json({ statusCode: 500, error: 'Failed to retrieve user' });
        }
    }) as RequestHandler
);

export default userRouter;