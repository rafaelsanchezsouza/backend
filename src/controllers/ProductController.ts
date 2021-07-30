import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import storeProducts from '../models/storeProducts';
import * as Yup from 'yup';

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

    const requestImage = request.file.filename;
    const productImage = { path: requestImage };

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
      productImage,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      category: Yup.string().required(),
      description: Yup.string(),
      storePrice: Yup.number().required(),
      storeQuantity: Yup.number().required(),
      storeUnit: Yup.string(),
      supplierPrice: Yup.number(),
      supplierQuantity: Yup.number(),
      supplierUnit: Yup.string(),
      dueDate: Yup.number(),
      image: Yup.object().shape({ path: Yup.string() }),
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

  async getAllStoreProducts(request: Request, response: Response) {
    const storeProductsRepository = getRepository(storeProducts);

    const getStoreProducts = await storeProductsRepository.query(`
    SELECT * from storeProducts`);

    return response.json(getStoreProducts);
  },

  async getStoreProductById(request: Request, response: Response) {
    const storeProductId = parseInt(request.params.id);

    const storeProductsRepository = getRepository(storeProducts);

    const storeProduct = await storeProductsRepository.find({ where: { storeProductId } })

    return response.json(storeProduct)
  },

  async DeleteStoreProductById(request: Request, response: Response) {
    const storeProductId = parseInt(request.params.id);

    const storeProductsRepository = getRepository(storeProducts);

    const storeProduct = await storeProductsRepository.findOne({ where: { storeProductId } })

    if (storeProduct) {
      await storeProductsRepository.delete(storeProduct)
    }

    return response.json(storeProduct)
  }
};
