import Vehicle, { IVehicle } from '../models/Vehicle';
import mongoose from 'mongoose';

class VehicleService {
  async getAll() {
    console.log('Fetching all vehicles');
    return await Vehicle.find().populate('assignedDrivers');
  }

  async getById(id: string) {
    console.log(`Fetching vehicle by ID: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid vehicle ID');
    }
    const vehicle = await Vehicle.findById(id).populate('assignedDrivers');
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  }

  async create(data: {
    vehicleId: string;
    make: string;
    model: string;
    year: number;
    vin: string;
    licensePlate: string;
    status: string;
    purchaseDate: string;
    mileage: number;
  }) {
    console.log(`Creating new vehicle: ${data.vehicleId}`);

    // Check if vehicle with same VIN or license plate already exists
    const existingVehicle = await Vehicle.findOne({
      $or: [{ vin: data.vin }, { licensePlate: data.licensePlate }],
    });
    if (existingVehicle) {
      throw new Error('Vehicle with this VIN or license plate already exists');
    }

    const vehicle = new Vehicle({
      vehicleId: data.vehicleId,
      make: data.make,
      model: data.model,
      year: data.year,
      vin: data.vin,
      licensePlate: data.licensePlate,
      status: data.status,
      purchaseDate: new Date(data.purchaseDate),
      mileage: data.mileage,
    });

    await vehicle.save();
    console.log(`Vehicle created successfully: ${vehicle._id}`);
    return vehicle;
  }

  async update(id: string, data: Partial<IVehicle>) {
    console.log(`Updating vehicle: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid vehicle ID');
    }

    const vehicle = await Vehicle.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('assignedDrivers');

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    console.log(`Vehicle updated successfully: ${id}`);
    return vehicle;
  }

  async delete(id: string) {
    console.log(`Deleting vehicle: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid vehicle ID');
    }

    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    console.log(`Vehicle deleted successfully: ${id}`);
    return vehicle;
  }

  async assignDriver(vehicleId: string, driverId: string) {
    console.log(`Assigning driver ${driverId} to vehicle ${vehicleId}`);
    if (!mongoose.Types.ObjectId.isValid(vehicleId) || !mongoose.Types.ObjectId.isValid(driverId)) {
      throw new Error('Invalid vehicle or driver ID');
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (!vehicle.assignedDrivers.includes(new mongoose.Types.ObjectId(driverId))) {
      vehicle.assignedDrivers.push(new mongoose.Types.ObjectId(driverId));
      await vehicle.save();
      console.log(`Driver assigned successfully`);
    }

    return vehicle;
  }

  async removeDriver(vehicleId: string, driverId: string) {
    console.log(`Removing driver ${driverId} from vehicle ${vehicleId}`);
    if (!mongoose.Types.ObjectId.isValid(vehicleId) || !mongoose.Types.ObjectId.isValid(driverId)) {
      throw new Error('Invalid vehicle or driver ID');
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    vehicle.assignedDrivers = vehicle.assignedDrivers.filter(
      did => did.toString() !== driverId
    );
    await vehicle.save();
    console.log(`Driver removed successfully`);
    return vehicle;
  }

  async addMaintenanceNote(vehicleId: string, note: string) {
    console.log(`Adding maintenance note to vehicle: ${vehicleId}`);
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new Error('Invalid vehicle ID');
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    vehicle.maintenanceNotes.push({
      note,
      date: new Date(),
    });
    await vehicle.save();
    console.log(`Maintenance note added successfully`);
    return vehicle;
  }
}

export default new VehicleService();
