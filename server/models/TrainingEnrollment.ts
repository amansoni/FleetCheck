import mongoose, { Document, Schema } from 'mongoose';

export interface IModuleCompletion {
  moduleId: mongoose.Schema.Types.ObjectId;
  completed: boolean;
  completionDate?: Date;
  score?: number;
}

export interface ITrainingEnrollment extends Document {
  driverId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  enrollmentDate: Date;
  completionDate?: Date;
  status: 'Enrolled' | 'In Progress' | 'Completed' | 'Failed';
  progress: number; // percentage 0-100
  score?: number;
  moduleCompletions: IModuleCompletion[];
  createdAt: Date;
  updatedAt: Date;
}

const moduleCompletionSchema = new Schema<IModuleCompletion>(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completionDate: Date,
    score: Number,
  },
  { _id: true }
);

const schema = new Schema<ITrainingEnrollment>(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainingCourse',
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: Date,
    status: {
      type: String,
      enum: ['Enrolled', 'In Progress', 'Completed', 'Failed'],
      default: 'Enrolled',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    score: Number,
    moduleCompletions: {
      type: [moduleCompletionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TrainingEnrollment = mongoose.model<ITrainingEnrollment>('TrainingEnrollment', schema);

export default TrainingEnrollment;
