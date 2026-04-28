import { Router } from 'express';
import { API } from '../constant/api';
import { registerController } from '../controller.ts/auth/register';
import { getAllServicesController } from '../controller.ts/service/getService';

const router = Router();

router.get(
   API.SERVICES,
   getAllServicesController
);

router.post(
   API.REGISTER,
   registerController
);

export default router;