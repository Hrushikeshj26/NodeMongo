import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/users', getUsers);
router.post('/login', loginUser)

// PROTECTED ROUTES
router.get('/users/:id', authMiddleware, getUserById);
router.post('/users', authMiddleware, createUser);
router.put('/users/:id', authMiddleware, updateUser,);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
