import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { ROLE } from "../constant/enum";
import { getProviderJobsController } from "../controller.ts/provider/getJobs";
import { API } from "../constant/api";
import { getMyWorksController } from "../controller.ts/provider/getMyWork";
import { changeStatusController } from "../controller.ts/provider/changeBookingStatus";
import { updateActiveStatusController } from "../controller.ts/provider/updateActiveStatus";

const router = Router();

router.use(
   authMiddleware(ROLE.PROVIDER)
);



router.get(
   API.JOB,
   getProviderJobsController
);

router.get(
   API.MYWORK,
   getMyWorksController
);

router.patch(
   API.BOOK,
   changeStatusController
)

router.patch(
   API.ACTIVE,
   updateActiveStatusController
);

export default router;