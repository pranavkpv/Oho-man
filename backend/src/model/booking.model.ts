import mongoose, { Schema, Document } from "mongoose";
import { SERVICESTATUS } from "../constant/enum";

export type BookingStatus = "pending" | "inprogress" | "completed";

export interface IBooking extends Document {
  providerId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  status: BookingStatus;
  rating:number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [SERVICESTATUS.PENDING, SERVICESTATUS.PROGRESS, SERVICESTATUS.COMPLETE],
      default: SERVICESTATUS.PENDING,
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);