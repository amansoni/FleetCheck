import mongoose, { Document, Schema } from 'mongoose';

export interface IMaintenanceNote {
  note: string;
  date: Date;
}

export interface IVehicle extends Document {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: 'Active' | 'Inactive' | 'Under Maintenance';
  purchaseDate: Date;
  mileage: number;
  assignedDrivers: mongoose.Schema.Types.ObjectId[];
  maintenanceNotes: IMaintenanceNote[];
  createdAt: Date;
  updatedAt: Date;
}

const maintenanceNoteSchema = new Schema<IMaintenanceNote>(
  {
    note: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const schema = new Schema<IVehicle>(
  {
    vehicleId: {
      type: String,
      required: true,
      unique: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Under Maintenance'],
      default: 'Active',
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
      default: 0,
    },
    assignedDrivers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Driver',
      default: [],
    },
    maintenanceNotes: {
      type: [maintenanceNoteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Vehicle = mongoose.model<IVehicle>('Vehicle', schema);

export default Vehicle;
