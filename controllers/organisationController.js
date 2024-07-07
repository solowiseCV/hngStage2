import mongoose from 'mongoose';
import Organisation from '../models/organisationModel.js';
import User from '../models/userModel.js';

// Get All Organisations for a User
const getAllOrganisations = async (req, res) => {
  const userId = req.user._id;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user ID',
    });
  }

  const user = await User.findById(userId).populate('organisations');
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Organisations retrieved successfully',
    data: {
      organisations: user.organisations,
    },
  });
};

// Get Specific Organisation
const getOrganisation = async (req, res) => {
  const orgId = req.params.orgId;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid organisation ID',
    });
  }

  const organisation = await Organisation.findById(orgId);
  if (!organisation) {
    return res.status(404).json({
      status: 'error',
      message: 'Organisation not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Organisation retrieved successfully',
    data: organisation,
  });
};

// Create Organisation
const createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user ID',
    });
  }

  const organisation = new Organisation({
    name,
    description,
  });

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  user.organisations.push(organisation._id);
  organisation.users.push(user._id);

  await organisation.save();
  await user.save();

  res.status(201).json({
    status: 'success',
    message: 'Organisation created successfully',
    data: {
      orgId: organisation._id,
      name: organisation.name,
      description: organisation.description,
    },
  });
};

// Add User to Organisation
const addUserToOrganisation = async (req, res) => {
  const { userId } = req.body;
  const orgId = req.params.orgId;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user or organisation ID',
    });
  }

  const organisation = await Organisation.findById(orgId);
  const user = await User.findById(userId);

  if (!organisation || !user) {
    return res.status(404).json({
      status: 'error',
      message: 'User or Organisation not found',
    });
  }

  organisation.users.push(user._id);
  user.organisations.push(organisation._id);

  await organisation.save();
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'User added to organisation successfully',
    data: {
      orgId: organisation._id,
      userId: user._id,
    },
  });
};

export {
  getAllOrganisations,
  getOrganisation,
  createOrganisation,
  addUserToOrganisation,
};
