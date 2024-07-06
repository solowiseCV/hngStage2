import { v4 as uuidv4 } from 'uuid';
import Organisation from '../models/organisationModel.js';
import User from '../models/userModel.js';

const getAllOrganisations = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId).populate('organisations');
  res.status(200).json({
    status: 'success',
    message: 'Organisations retrieved successfully',
    data: {
      organisations: user.organisations,
    },
  });
};

const getOrganisation = async (req, res) => {
  const orgId = req.params.orgId;
  const organisation = await Organisation.findById(orgId);
  res.status(200).json({
    status: 'success',
    message: 'Organisation retrieved successfully',
    data: organisation,
  });
};

const createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId;
  const organisation = new Organisation({
    orgId: uuidv4(),
    name,
    description,
  });

  const user = await User.findById(userId);
  user.organisations.push(organisation);
  organisation.users.push(user);

  await organisation.save();
  await user.save();

  res.status(201).json({
    status: 'success',
    message: 'Organisation created successfully',
    data: {
      orgId: organisation.orgId,
      name: organisation.name,
      description: organisation.description,
    },
  });
};

const addUserToOrganisation = async (req, res) => {
  const { userId } = req.body;
  const orgId = req.params.orgId;
  const organisation = await Organisation.findById(orgId);
  const user = await User.findById(userId);

  if (!organisation || !user) {
    return res.status(404).json({
      status: 'error',
      message: 'User or Organisation not found',
    });
  }

  organisation.users.push(user);
  user.organisations.push(organisation);

  await organisation.save();
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'User added to organisation successfully',
    data: {
      orgId: organisation.orgId,
      userId: user.userId,
    },
  });
};

export {
  getAllOrganisations,
  getOrganisation,
  createOrganisation,
  addUserToOrganisation,
};
