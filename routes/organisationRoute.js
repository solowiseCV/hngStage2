import express from 'express';
import {
  getAllOrganisations,
  getOrganisation,
  createOrganisation,
  addUserToOrganisation,
} from '../controllers/organisationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllOrganisations);
router.get('/:orgId', getOrganisation);
router.post('/', createOrganisation);
router.post('/:orgId/users', addUserToOrganisation);

export default router;
