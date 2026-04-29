import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { ROLE } from "../constant/enum";
import { getProviderJobsController } from "../controller.ts/provider/getJobs";
import { API } from "../constant/api";

const router = Router();

router.use(
   authMiddleware(ROLE.PROVIDER)
);

router.get(
   API.JOB,
   getProviderJobsController
);

export default router;