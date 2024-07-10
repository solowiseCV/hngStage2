import jwt from 'jsonwebtoken';
import config from '../config/config.js';


const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  console.log('Token from cookies:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log('Decoded token:', decoded);
    
    req.user = decoded;
    req.userId = decoded.userId;
    console.log(req.userId);
    next();
  } catch (ex) {
    console.error('Token verification failed:', ex);
    res.status(400).json({ message: 'Invalid token.' });
  }

  
};

export default verifyToken;
