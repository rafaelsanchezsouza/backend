import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import storeProduct from '../models/storeProducts';
import * as Yup from 'yup';
import productImages from '../models/productImages';

export default {
  async addStoreProduct(request: Request, response: Response) {
    const {
      name,
      category,
      description,
      storePrice,
      storeQuantity,
      storeUnit,
      supplierPrice,
      supplierQuantity,
      supplierUnit,
      dueDate,
    } = request.body;

    const storeProductRepository = getRepository(storeProduct);

    const data = {
      name,
      category,
      description,
      storePrice,
      storeQuantity,
      storeUnit,
      supplierPrice,
      supplierQuantity,
      supplierUnit,
      dueDate,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      category: Yup.string().required(),
      description: Yup.string(),
      storePrice: Yup.number().required(),
      storeQuantity: Yup.number().required(),
      storeUnit: Yup.string().required(),
      supplierPrice: Yup.number(),
      supplierQuantity: Yup.number(),
      supplierUnit: Yup.string(),
      dueDate: Yup.number(),
    });

    await schema.validate(data),
      {
        abortEarly: false,
      };

    const newStoreProduct = storeProductRepository.create(data);
    await storeProductRepository.save(newStoreProduct);

    return response
      .status(201)
      .json({ message: `Product, ${name}, added to store!` });
  },

  async updateStoreProduct(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const updateStoreProduct = request.body;

    const schema = Yup.object().shape({
      name: Yup.string(),
      category: Yup.string(),
      description: Yup.string(),
      storePrice: Yup.number(),
      storeQuantity: Yup.number(),
      storeUnit: Yup.number(),
      supplierPrice: Yup.number(),
      supplierQuantity: Yup.number(),
      supplierUnit: Yup.number(),
      dueDate: Yup.date(),
    });

    await schema.validate(updateStoreProduct),
      {
        abortEarly: false,
      };

    const storeProductRepository = getRepository(storeProduct);
    await storeProductRepository.update(id, updateStoreProduct);

    return response.json(updateStoreProduct);
  },

  async getStoreProducts(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const storeProductRepository = getRepository(storeProduct);

    const getStoreProduct = await storeProductRepository.query(`
    SELECT * from storeProduct`);

    return response.json(storeProduct);
  },

  // async showReport(request: Request, response: Response) {

  // },
};
