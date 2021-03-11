import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ProductController from './controllers/ProductController';

const routes = Router();
const upload = multer(uploadConfig);

console.log('PRE POST ');
routes.post(
  '/product',
  upload.single('productImages'),
  ProductController.addStoreProduct
);
routes.put('/product/:id', ProductController.updateStoreProduct);
routes.get('/products', ProductController.getStoreProducts);

export default routes;
