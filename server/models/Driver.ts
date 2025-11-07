import mongoose, { Document, Schema } from 'mongoose';

export interface IDriver extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employmentStatus: 'Active' | 'Inactive' | 'On Leave' | 'Suspended';
  licenseNumber: string;
  licenseExpiryDate: Date;
  hireDate: Date;
  emergencyContactName: string;
  emergencyContactPhone: string;
  assignedVehicles: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IDriver>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    employmentStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'On Leave', 'Suspended'],
      default: 'Active',
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseExpiryDate: {
      type: Date,
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactPhone: {
      type: String,
      required: true,
    },
    assignedVehicles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Vehicle',
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Driver = mongoose.model<IDriver>('Driver', schema);

export default Driver;
