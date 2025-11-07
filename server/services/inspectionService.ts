import Inspection, { IInspection } from '../models/Inspection';
import InspectionForm, { IInspectionForm } from '../models/InspectionForm';
import mongoose from 'mongoose';

class InspectionService {
  async getAllForms() {
    console.log('Fetching all inspection forms');
    return await InspectionForm.find()
      .populate('assignedVehicles')
      .populate('assignedDrivers');
  }

  async getFormById(id: string) {
    console.log(`Fetching inspection form by ID: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid form ID');
    }
    const form = await InspectionForm.findById(id)
      .populate('assignedVehicles')
      .populate('assignedDrivers');
    if (!form) {
      throw new Error('Inspection form not found');
    }
    return form;
  }

  async createForm(data: {
    name: string;
    description: string;
    status: string;
    checklistItems: Array<Record<string, unknown>>;
    trainingResources: Array<Record<string, unknown>>;
    assignedVehicles: Array<string>;
    assignedDrivers: Array<string>;
  }) {
    console.log(`Creating new inspection form: ${data.name}`);

    const form = new InspectionForm({
      name: data.name,
      description: data.description,
      status: data.status,
      checklistItems: data.checklistItems,
      trainingResources: data.trainingResources,
      assignedVehicles: data.assignedVehicles.map(id => new mongoose.Types.ObjectId(id)),
      assignedDrivers: data.assignedDrivers.map(id => new mongoose.Types.ObjectId(id)),
    });

    await form.save();
    console.log(`Inspection form created successfully: ${form._id}`);
    return form;
  }

  async updateForm(id: string, data: Partial<IInspectionForm>) {
    console.log(`Updating inspection form: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid form ID');
    }

    const form = await InspectionForm.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate('assignedVehicles')
      .populate('assignedDrivers');

    if (!form) {
      throw new Error('Inspection form not found');
    }
    console.log(`Inspection form updated successfully: ${id}`);
    return form;
  }

  async deleteForm(id: string) {
    console.log(`Deleting inspection form: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid form ID');
    }

    const form = await InspectionForm.findByIdAndDelete(id);
    if (!form) {
      throw new Error('Inspection form not found');
    }
    console.log(`Inspection form deleted successfully: ${id}`);
    return form;
  }

  async getAllInspections() {
    console.log('Fetching all inspections');
    return await Inspection.find()
      .populate('formId')
      .populate('vehicleId')
      .populate('driverId');
  }

  async getInspectionById(id: string) {
    console.log(`Fetching inspection by ID: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid inspection ID');
    }

    const inspection = await Inspection.findById(id)
      .populate('formId')
      .populate('vehicleId')
      .populate('driverId');

    if (!inspection) {
      throw new Error('Inspection not found');
    }
    return inspection;
  }

  async submitInspection(data: {
    formId: string;
    vehicleId: string;
    driverId: string;
    mileage: number;
    checklistResults: Array<Record<string, unknown>>;
    issuesFound: Array<Record<string, unknown>>;
    overallResult: string;
    inspectorSignature: string;
  }) {
    console.log(`Creating new inspection`);

    // Validate that form, vehicle, and driver exist
    if (!mongoose.Types.ObjectId.isValid(data.formId)) {
      throw new Error('Invalid form ID');
    }
    if (!mongoose.Types.ObjectId.isValid(data.vehicleId)) {
      throw new Error('Invalid vehicle ID');
    }
    if (!mongoose.Types.ObjectId.isValid(data.driverId)) {
      throw new Error('Invalid driver ID');
    }

    const form = await InspectionForm.findById(data.formId);
    if (!form) {
      throw new Error('Inspection form not found');
    }

    const inspection = new Inspection({
      formId: new mongoose.Types.ObjectId(data.formId),
      vehicleId: new mongoose.Types.ObjectId(data.vehicleId),
      driverId: new mongoose.Types.ObjectId(data.driverId),
      mileage: data.mileage,
      checklistResults: data.checklistResults,
      issuesFound: data.issuesFound,
      overallResult: data.overallResult,
      inspectorSignature: data.inspectorSignature,
    });

    await inspection.save();
    console.log(`Inspection submitted successfully: ${inspection._id}`);
    return inspection;
  }

  async getInspectionsByVehicle(vehicleId: string) {
    console.log(`Fetching inspections for vehicle: ${vehicleId}`);
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new Error('Invalid vehicle ID');
    }

    return await Inspection.find({ vehicleId: new mongoose.Types.ObjectId(vehicleId) })
      .populate('formId')
      .populate('driverId');
  }

  async getInspectionsByDriver(driverId: string) {
    console.log(`Fetching inspections for driver: ${driverId}`);
    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      throw new Error('Invalid driver ID');
    }

    return await Inspection.find({ driverId: new mongoose.Types.ObjectId(driverId) })
      .populate('formId')
      .populate('vehicleId');
  }
}

export default new InspectionService();
