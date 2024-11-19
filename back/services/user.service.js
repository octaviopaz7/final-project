import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

export const comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcryptjs.compare(enteredPassword, hashedPassword);
};

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

