import bcrypt from "bcrypt";

import { UserModel } from "../models/User.js";
import { generate } from "../helpers/token.js";
import * as roles from "../constants/roles.js";

export const register = async (login, password) => {
    if (!password) {
        throw new Error("Password is empty");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        login,
        password: passwordHash,
    });

    const token = generate({ id: user._id });

    return {
        token,
        user,
    };
};

export const login = async (login, password) => {
    const user = await UserModel.findOne({ login });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Login or password is not correct");
    }

    const token = generate({ id: user._id });

    return {
        token,
        user,
    };
};

export const getUsers = async () => {
    const users = await UserModel.find();

    if (!users) {
        throw new Error("Failed to get all users");
    }

    return users;
};

export const getRoles = () => {
    return [
        {
            id: roles.ADMIN,
            name: "Admin",
        },
        {
            id: roles.MODERATOR,
            name: "Moderator",
        },
        {
            id: roles.USER,
            name: "User",
        },
    ];
};

export const deleteUser = async (id) => {
    const user = await UserModel.deleteOne({ _id: id });

    if (!user) {
        throw new Error("Failed to delete user");
    }

    return user;
};

export const updateUser = async (id, userData) => {
    const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: id },
        userData,
        { returnDocument: "after" }
    );

    if (!updatedUser) {
        throw new Error("Failed to update user");
    }

    return updatedUser;
};
