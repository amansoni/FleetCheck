import mongoose, { Document, Schema } from 'mongoose';

export interface IChecklistResult {
  itemName: string;
  result: 'Pass' | 'Fail' | 'N/A';
  notes?: string;
}

export interface IIssueFound {
  issue: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description?: string;
}

export interface IInspection extends Document {
  formId: mongoose.Schema.Types.ObjectId;
  vehicleId: mongoose.Schema.Types.ObjectId;
  driverId: mongoose.Schema.Types.ObjectId;
  date: Date;
  mileage: number;
  checklistResults: IChecklistResult[];
  issuesFound: IIssueFound[];
  overallResult: 'Pass' | 'Fail' | 'Conditional Pass';
  inspectorSignature: string;
  createdAt: Date;
  updatedAt: Date;
}

const checklistResultSchema = new Schema<IChecklistResult>(
  {
    itemName: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      enum: ['Pass', 'Fail', 'N/A'],
      required: true,
    },
    notes: String,
  },
  { _id: false }
);

const issueFoundSchema = new Schema<IIssueFound>(
  {
    issue: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true,
    },
    description: String,
  },
  { _id: false }
);

const schema = new Schema<IInspection>(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InspectionForm',
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    mileage: {
      type: Number,
      required: true,
    },
    checklistResults: {
      type: [checklistResultSchema],
      default: [],
    },
    issuesFound: {
      type: [issueFoundSchema],
      default: [],
    },
    overallResult: {
      type: String,
      enum: ['Pass', 'Fail', 'Conditional Pass'],
      required: true,
    },
    inspectorSignature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Inspection = mongoose.model<IInspection>('Inspection', schema);

export default Inspection;
