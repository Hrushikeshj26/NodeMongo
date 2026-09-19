import express from 'express'
import User from "../models/User.js";

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found!'})
    }

    res.status(200).json(foundUser)
  } catch (e) {
    res.status(500).json({ error: e.message})
  }
})


router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'user added successfully..', data: newUser})
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
})


router.put('/users/:id', async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!updateUser) {
      res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ message: 'User Updated Successfully....', data: updateUser})
  } catch (e) {
    res.status(500).json({ error: e.message})
  }
})


router.delete('/users/:id', async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ message: 'User Deleted Successfully....', data: deleteUser})
  } catch (e) {
    res.status(500).json({ error: e.message})
  }
})


export default router;
