import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import storeProducts from '../models/storeProducts';
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

    const storeProductsRepository = getRepository(storeProducts);

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

    const newStoreProducts = storeProductsRepository.create(data);
    await storeProductsRepository.save(newStoreProducts);

    return response
      .status(201)
      .json({ message: `Product, ${name}, added to store!` });
  },

  async updateStoreProduct(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const updateStoreProducts = request.body;

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

    await schema.validate(updateStoreProducts),
      {
        abortEarly: false,
      };

    const storeProductsRepository = getRepository(storeProducts);
    await storeProductsRepository.update(id, updateStoreProducts);

    return response.json(updateStoreProducts);
  },

  async getStoreProducts(request: Request, response: Response) {
    const storeProductsRepository = getRepository(storeProducts);

    const getStoreProducts = await storeProductsRepository.query(`
    SELECT * from storeProducts`);

    return response.json(getStoreProducts);
  },

  // async showReport(request: Request, response: Response) {

  // },
};
