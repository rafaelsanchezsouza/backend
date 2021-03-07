import { Router } from 'express';

import SurvivorController from './controllers/ProductController';

const routes = Router();

routes.post('/survivor', SurvivorController.addSurvivor);
routes.put('/survivor/:id', SurvivorController.updateLocation);
routes.put('/flagInfected/:id', SurvivorController.flagAsInfected);
routes.put('/tradeItem/:id1/:id2', SurvivorController.tradeItem);
routes.get('/report', SurvivorController.showReport);

export default routes;
