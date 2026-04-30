import { Router } from 'express';
import { API } from '../constant/api';
import { registerController } from '../controller.ts/auth/register';
import { getAllServicesController } from '../controller.ts/service/getService';
import { loginController } from '../controller.ts/auth/login';
import { refreshTokenController } from '../controller.ts/auth/refreshToken';

const router = Router();

router.get(
   API.SERVICES,
   getAllServicesController
);

router.post(
   API.REGISTER,
   registerController
);

router.post(
   API.LOGIN,
   loginController
);

router.post("/refresh-token", refreshTokenController);

export default router;