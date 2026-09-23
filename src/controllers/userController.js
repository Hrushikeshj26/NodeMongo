// Database model yahan import hoga kyunki database se baat controller karega
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 1. Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 2. Get Single User by ID
export const getUserById = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json(foundUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 3. Create New User
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, Email, password required!!' });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({error: 'Email already exits...'})
    }

    // Password Encrypt.............
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      name, email, password: hashedPassword
    })
    res.status(201).json({ message: 'User added Successfully...', data: newUser})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
};

// 4. Update User
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json({ message: 'User Updated Successfully....', data: updatedUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 5. Delete User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json({ message: 'User Deleted Successfully....', data: deletedUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({error: 'Email and Password requred!!'})
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({error: 'User not found!!'})
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'wrong password!!'})
    }

    res.status(200).json({
      message: 'Login Successfully....',
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email
      }
    })
  } catch (e) {
    res.status(500).json({ error: e.message})
  }
}
