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


        /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'User data to add.',
            required: true,
            schema: { $ref: "#/definitions/AddUser" }
        } */
        const user: User = req.body;

        userRepository.add(user, (error: any, user: any) => {
            if (error) {
                if (error.code === "auth/email-already-exists") {
                    res.status(409).json({ message: "E-mail already exists" });
                } else {
                    res.status(500).send();
                }
            } else {
                // #swagger.responses[201] = { description: "Successfully created a new user." }
                res.status(201).json({ codeStaus: 201, user: user });
            }
        });
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
            const user: User = req.body;
            const loggedUser = await userRepository.login(user);
            if (loggedUser != null) {
                return res.status(201).json({ statusCode: 201, user: loggedUser });
            } else {
                return res.status(400).json({ statusCode: 400, user: null });
            }
        } catch (error) {
            console.error('Error on user login:', error);
            throw error;
        }
    }) as RequestHandler
);

userRouter.get('/users/:uid', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description 'Endpoint to get a user by id.'
    const uid = req.params.uid;
    userRepository.get(uid, (error: any, user: any) => {
        if (error) {
            console.error("Error getting user from repository. ", error);
            res.status(500).send();
        } else {
            /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/User" },
               description: 'Found user object.' 
            } */
            res.status(200).json({ statusCode: 200, user: user});
        }
    });
});

export default userRouter;