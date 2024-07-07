import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/userModel.js';
import Organisation from '../models/organisationModel.js';
import config from '../config/config.js';

const registerUser = async (userData) => {
  const { firstName, lastName, email, password, phone } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    userId: uuidv4(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
  });

  const organisation = new Organisation({
    orgId: uuidv4(),
    name: `${firstName}'s Organisation`,
    description: '',
  });

  user.organisations.push(organisation.orgId);
  organisation.users.push(user.userId);

  await user.save();
  await organisation.save();

  const token = jwt.sign({ userId: user.userId }, config.jwtSecret, { expiresIn: '1h' });

  return { user, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Authentication failed');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Authentication failed');
  }

  const token = jwt.sign({ userId: user.userId }, config.jwtSecret, { expiresIn: '1h' });

  return { user, token };
};

export { registerUser, loginUser };
