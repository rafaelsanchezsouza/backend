import { Router } from 'express';

import ProductController from './controllers/ProductController';

const routes = Router();

routes.post('/product', ProductController.addStoreProduct);
routes.put('/product/:id', ProductController.updateStoreProduct);
routes.get('/products', ProductController.getStoreProducts);

export default routes;
