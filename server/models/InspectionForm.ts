import mongoose, { Document, Schema } from 'mongoose';

export interface IChecklistItem {
  name: string;
  type: 'Visual Check' | 'Measurement' | 'Yes/No' | 'Text';
  required: boolean;
  helpText?: string;
}

export interface ITrainingResource {
  title: string;
  url: string;
  type: 'Document' | 'Video' | 'Link';
  description?: string;
}

export interface IInspectionForm extends Document {
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Draft';
  checklistItems: IChecklistItem[];
  trainingResources: ITrainingResource[];
  assignedVehicles: mongoose.Schema.Types.ObjectId[];
  assignedDrivers: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const checklistItemSchema = new Schema<IChecklistItem>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Visual Check', 'Measurement', 'Yes/No', 'Text'],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    helpText: String,
  },
  { _id: true }
);

const trainingResourceSchema = new Schema<ITrainingResource>(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Document', 'Video', 'Link'],
      required: true,
    },
    description: String,
  },
  { _id: true }
);

const schema = new Schema<IInspectionForm>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Draft'],
      default: 'Active',
    },
    checklistItems: {
      type: [checklistItemSchema],
      default: [],
    },
    trainingResources: {
      type: [trainingResourceSchema],
      default: [],
    },
    assignedVehicles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Vehicle',
      default: [],
    },
    assignedDrivers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Driver',
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InspectionForm = mongoose.model<IInspectionForm>('InspectionForm', schema);

export default InspectionForm;
