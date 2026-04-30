import { Router } from 'express';
import { API } from '../constant/api';
import { getUserByServiceIdController } from '../controller.ts/user/getByServiceId';
import { createBookingController } from '../controller.ts/user/booking';
import { authMiddleware } from '../middleware/auth.middleware';
import { ROLE } from '../constant/enum';
import { getUserBookingsController } from '../controller.ts/user/getUserBooking';
import { verifyToken } from '../middleware/verifyToken.middleware';
import { switchRoleController } from '../controller.ts/user/switchRole';
import { addRatingController } from '../controller.ts/user/addRating';

const router = Router();


// accessible by both user/provider (token only)
router.patch(
  API.SWITCH_ROLE,
  verifyToken,
  switchRoleController
);

// only activeRole=user routes below
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

router.post("/add-rating", addRatingController);

export default router;