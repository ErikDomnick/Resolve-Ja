import jwt from 'jsonwebtoken';

export const signAdminToken = (email) =>
  jwt.sign({ role: 'ADMIN', email }, process.env.JWT_SECRET, {
    subject: 'admin',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
