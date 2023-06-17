import express from 'express';
import UserRepository from '../repositories/UserRepository';
import { celebrate, Joi } from 'celebrate';
import User from '../models/User';

const usersRouter = express.Router();
const userRepository = new UserRepository();

usersRouter.post('/users',
    celebrate({
        body: Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
            name: Joi.string().required().max(50),
        })
    }),
    (req, res) => {
        const user: User = req.body;
        userRepository.add(user, (error: any, token: any) => {
            if (error) {
                if (error.code === "auth/email-already-exists") {
                    res.status(409).json({ message: "E-mail already exists" });
                } else {
                    res.status(500).send();
                }
            } else {
                res.status(201).json({ token });
            }
        });
    });

usersRouter.post('/users/login',
    celebrate({
        body: Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8)
        })
    }),
    (req, res) => {
        const user: User = req.body;
        const acessToken: string = req.header('acessToken') || '';
        userRepository.login(user, acessToken, (customTokenJwt) => {
            if (customTokenJwt) {
                res.status(201).json({ customTokenJwt: customTokenJwt });
            } else {
                res.status(400).send();
            }
        })
    });

usersRouter.get('/users/:uid', (req, res) => {
    const uid = req.params.uid;
    userRepository.get(uid, (error: any, user: any) => {
        if (error) {
            console.error("Error getting user from repository. ", error);
            res.status(500).send();
        } else {
            res.status(200).json(user);
        }
    });
});

export default usersRouter;