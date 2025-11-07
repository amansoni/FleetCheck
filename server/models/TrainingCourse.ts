import mongoose, { Document, Schema } from 'mongoose';

export interface ITrainingModule {
  title: string;
  type: 'Video' | 'Document' | 'Quiz' | 'Assignment';
  duration: number; // in minutes
  required: boolean;
  order: number;
}

export interface ITrainingCourse extends Document {
  name: string;
  description: string;
  duration: number; // in hours
  status: 'Active' | 'Inactive' | 'Draft';
  modules: ITrainingModule[];
  completionRequirements: string;
  linkedInspectionForms: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const trainingModuleSchema = new Schema<ITrainingModule>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Video', 'Document', 'Quiz', 'Assignment'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

const schema = new Schema<ITrainingCourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Draft'],
      default: 'Active',
    },
    modules: {
      type: [trainingModuleSchema],
      default: [],
    },
    completionRequirements: {
      type: String,
      required: true,
    },
    linkedInspectionForms: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'InspectionForm',
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TrainingCourse = mongoose.model<ITrainingCourse>('TrainingCourse', schema);

export default TrainingCourse;
