import mongoose from "mongoose";
import userModel from "../model/user.model";
import { registerData } from "../dto/request";

export const userRepository = {
  // FIND BY EMAIL
  findByEmail: async (email: string) => {
    return await userModel.findOne({ email });
  },

  // CREATE USER
  createUser: async (data: registerData) => {
    return await userModel.create(data);
  },

  // GET USER BY EMAIL (same as findByEmail, keep one if possible)
  findUserByEmail: async (email: string) => {
    return await userModel.findOne({ email });
  },

  // FIND USERS BY SERVICE ID
  findUsersByServiceId: async (serviceId: string) => {
    return await userModel.find({
      serviceIds: {
        $in: [new mongoose.Types.ObjectId(serviceId)],
      },
    });
  },

  updateActiveRole: async (
    userId: string,
    activeRole: string
  ) => {
    return userModel.findByIdAndUpdate(
      userId,
      {
        activeRole
      },
      {
        new: true
      }
    );
  },

  findUserWithServices: async (
    userId: string
  ) => {
    return userModel
      .findById(userId)
      .populate({
        path: "serviceIds",
        select:
          "_id serviceName image price"
      });

  },

  updateActiveStatus: async (
    userId: string,
    active: boolean
  ) => {
    return await userModel.findByIdAndUpdate(
      userId,
      { active },
      { new: true }
    );
  }


};