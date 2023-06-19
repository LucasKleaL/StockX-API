import express, { RequestHandler } from 'express';
import Product from '../models/Product';
import ProductRepository from '../repositories/ProductRepository';
import { celebrate, Joi } from 'celebrate';

const productRouter = express.Router();
const productRepository = new ProductRepository();

productRouter.post('/products', 
    celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            amount: Joi.number().required(),
            amountType: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
        })
    }),
    (async (req, res) => {
        try {
            const product: Product = req.body;
            const result  = await productRepository.add(product);
            return res.status(200).json({ statusCode: 201, result: result });
        } catch (error) {
            console.error("Error adding product: ", error);
            return res.status(500).json({ statusCode: 500, error: "Failed to add product" });
        }
    }) as RequestHandler
);

productRouter.put('/products',
    celebrate({
        body: Joi.object({
            uid: Joi.string().required(),
            name: Joi.string().required(),
            amount: Joi.number().required(),
            amountType: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
        })
    }),
    (async (req, res) => {
        try {
            const product: Product = req.body;
            const result  = await productRepository.update(product);
            return res.status(200).json({ statusCode: 201, result: result });
        } catch (error) {
            console.error("Error updating product: ", error);
            return res.status(500).json({ statusCode: 500, error: "Failed to update product" });
        }
    }) as RequestHandler
);

productRouter.get('/products/:uid', 
    (async (req, res) => {
        try {
            const uid = req.params.uid;
            const product = await productRepository.get(uid);
            if (product != null) {
                return res.status(200).json({ statusCode: 200, product: product });
            } else {
                return res.status(404).json({ statusCode: 404, product: product });
            }
        } catch (error) {
            console.error('Error retrieving product:', error);
            return res.status(500).json({ statusCode: 500, error: 'Failed to retrieve product' });
        }
    }) as RequestHandler
);

productRouter.get('/products', 
    (async (req, res) => {
        try {
            const products = await productRepository.getAll();
            if (products != null) {
                return res.status(200).json({ statusCode: 200, products: products });
            } else {
                return res.status(404).json({ statusCode: 404, products: products });
            }
        } catch (error) {
            console.error('Error retrieving all products:', error);
            return res.status(500).json({ statusCode: 500, error: 'Failed to retrieve all products' });
        }
    }) as RequestHandler
);

productRouter.delete('/products/:uid',
    (async (req, res) => {
        try {
            const uid = req.params.uid;
            const job = await productRepository.get(uid);
            if (!job) {
                return res.status(404).json({ statusCode: 404, error: 'Product not found' });
            }
            const deleted = await productRepository.delete(uid);
            return res.status(200).json({ statusCode: 200, message: `Job ${deleted} deleted successfully` });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ statusCode: 500, error: 'Failed to delete product' });
        }
    }) as RequestHandler
);

export default productRouter;