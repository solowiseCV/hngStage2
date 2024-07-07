import express from 'express';
import {
  getAllOrganisations,
  getOrganisation,
  createOrganisation,
  addUserToOrganisation,
} from '../controllers/organisationController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllOrganisations);
router.get('/:orgId', verifyToken, getOrganisation);
router.post('/', verifyToken, createOrganisation);
router.post('/:orgId/addUser', verifyToken, addUserToOrganisation);

export default router;
