import { Router } from 'express';
import { API } from '../constant/api';
import { getUserByServiceIdController } from '../controller.ts/user/getByServiceId';
import { createBookingController } from '../controller.ts/user/booking';
import { authMiddleware } from '../middleware/auth.middleware';
import { ROLE } from '../constant/enum';
import { getUserBookingsController } from '../controller.ts/user/getUserBooking';

const router = Router();

router.use(authMiddleware(ROLE.USER))

router.post(
   API.BOOK,
   createBookingController
)

router.get(
   API.BOOK,
   getUserBookingsController
)

router.get(
   API.USER_BY_SERVICE,
   getUserByServiceIdController
);

export default router;