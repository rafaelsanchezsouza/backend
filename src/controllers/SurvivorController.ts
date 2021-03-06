import { Request, Response } from 'express';
import { getRepository, EntityManager } from 'typeorm';
import Survivor from '../models/storeProducts';
import * as Yup from 'yup';
import Inventory from '../models/productImages';

export default {
  async addSurvivor(request: Request, response: Response) {
    const { name, age, gender, latitude, longitude, inventory } = request.body;

    const infectedFlag = 0;
    const infectedMark = false;

    const survivorRepository = getRepository(Survivor);

    const data = {
      name,
      age,
      gender,
      latitude,
      longitude,
      infectedFlag,
      infectedMark,
      inventory,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number().required().positive().integer(),
      gender: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
      // infectedFlag: Yup.string().required(),
      // infectedMark: Yup.string().required(),
      inventory: Yup.object({
        fileName: Yup.string(),
        quantity: Yup.number().positive().integer(),
      }).nullable(),
    });

    await schema.validate(data),
      {
        abortEarly: false,
      };

    const survivor = survivorRepository.create(data);
    await survivorRepository.save(survivor);

    return response
      .status(201)
      .json({ message: `Welcome, ${name}, to Zombieland!` });
  },

  async updateLocation(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const update = request.body;

    const schema = Yup.object().shape({
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
    });

    await schema.validate(update),
      {
        abortEarly: false,
      };

    const survivorRepository = getRepository(Survivor);
    await survivorRepository.update(id, {
      latitude: update.latitude,
      longitude: update.longitude,
    });
    const survivor = await survivorRepository.find({
      id: id,
    });
    // let survivorUpdate = await survivorRepository.findByIds(id);
    // await survivorUpdate.update(id, update);

    return response.json(survivor);
  },

  async flagAsInfected(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const survivorRepository = getRepository(Survivor);
    await survivorRepository.increment({ id: id }, 'infectedFlag', 1);

    const survivor = await survivorRepository.preload({ id: id });

    const infectedFlag = survivor?.infectedFlag;
    let updateInfectedMark = survivor?.infectedMark;

    if (infectedFlag) {
      infectedFlag >= 4
        ? (updateInfectedMark = true)
        : (updateInfectedMark = false);
    }
    await survivorRepository.update(id, { infectedMark: updateInfectedMark });

    return response.json(survivor);
  },

  async tradeItem(request: Request, response: Response) {
    const id1 = parseInt(request.params.id1);
    const id2 = parseInt(request.params.id2);

    const survivorRepository = getRepository(Survivor);
    const inventoryRepository = getRepository(Inventory);

    const survivor1 = await survivorRepository.preload({ id: id1 });
    const survivor2 = await survivorRepository.preload({ id: id2 });

    if (survivor1?.infectedMark == true)
      return response.json(
        `Trade is not possible! ${survivor1.name} is infected!`
      );
    else if (survivor2?.infectedMark == true)
      return response.json(
        `Trade is not possible! ${survivor2.name} is infected!`
      );
    else {
      return response.json(
        'Ooops! Sorry, Trade is still under implementation!'
      );
    }
  },

  async showReport(request: Request, response: Response) {
    const survivorRepository = getRepository(Survivor);
    const infected = survivorRepository.count({ infectedMark: true });
    const nonInfected = survivorRepository.count({ infectedMark: false });

    const percentageOfInfected =
      ((await infected) * 100) / ((await nonInfected) + (await infected));
    console.log(percentageOfInfected.toFixed(2));

    const percentageOfNonInfected =
      ((await nonInfected) * 100) / ((await nonInfected) + (await infected));
    console.log(percentageOfNonInfected.toFixed(2));

    const avgItemPerSurvivor = await survivorRepository.query(`
    SELECT  i.itemName, AVG(i.quantity) AS 'Average Per Survivor' from survivor s 
    inner join inventory i on i.survivorId  = s.id 
    inner join priceTable pt on pt.itemName = i.itemName 
    where s.infectedFlag  = false 
    group by i.itemName`);

    const lostPointsToInfected = await survivorRepository.query(`
    SELECT  i.itemName,SUM(i.quantity) as 'Total Quantity' from survivor s 
    inner join inventory i on i.survivorId  = s.id 
    inner join priceTable pt on pt.itemName = i.itemName 
    where s.infectedMark  = true 
    group by i.itemName`);

    return response.json({
      percentageOfInfected,
      percentageOfNonInfected,
      avgItemPerSurvivor,
      lostPointsToInfected,
    });
  },
};
