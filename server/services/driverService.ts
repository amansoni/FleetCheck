import Driver, { IDriver } from '../models/Driver';
import mongoose from 'mongoose';

class DriverService {
  async getAll() {
    console.log('Fetching all drivers');
    return await Driver.find().populate('assignedVehicles');
  }

  async getById(id: string) {
    console.log(`Fetching driver by ID: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid driver ID');
    }
    const driver = await Driver.findById(id).populate('assignedVehicles');
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver;
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    employmentStatus: string;
    hireDate: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  }) {
    console.log(`Creating new driver: ${data.email}`);

    // Check if driver with same license number already exists
    const existingDriver = await Driver.findOne({ licenseNumber: data.licenseNumber });
    if (existingDriver) {
      throw new Error('Driver with this license number already exists');
    }

    const driver = new Driver({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      employmentStatus: data.employmentStatus,
      hireDate: new Date(data.hireDate),
      licenseNumber: data.licenseNumber,
      licenseExpiryDate: new Date(data.licenseExpiryDate),
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
    });

    await driver.save();
    console.log(`Driver created successfully: ${driver._id}`);
    return driver;
  }

  async update(id: string, data: Partial<IDriver>) {
    console.log(`Updating driver: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid driver ID');
    }

    const driver = await Driver.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('assignedVehicles');

    if (!driver) {
      throw new Error('Driver not found');
    }
    console.log(`Driver updated successfully: ${id}`);
    return driver;
  }

  async delete(id: string) {
    console.log(`Deleting driver: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid driver ID');
    }

    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) {
      throw new Error('Driver not found');
    }
    console.log(`Driver deleted successfully: ${id}`);
    return driver;
  }

  async assignVehicle(driverId: string, vehicleId: string) {
    console.log(`Assigning vehicle ${vehicleId} to driver ${driverId}`);
    if (!mongoose.Types.ObjectId.isValid(driverId) || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new Error('Invalid driver or vehicle ID');
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    if (!driver.assignedVehicles.includes(new mongoose.Types.ObjectId(vehicleId))) {
      driver.assignedVehicles.push(new mongoose.Types.ObjectId(vehicleId));
      await driver.save();
      console.log(`Vehicle assigned successfully`);
    }

    return driver;
  }

  async removeVehicle(driverId: string, vehicleId: string) {
    console.log(`Removing vehicle ${vehicleId} from driver ${driverId}`);
    if (!mongoose.Types.ObjectId.isValid(driverId) || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new Error('Invalid driver or vehicle ID');
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    driver.assignedVehicles = driver.assignedVehicles.filter(
      vid => vid.toString() !== vehicleId
    );
    await driver.save();
    console.log(`Vehicle removed successfully`);
    return driver;
  }
}

export default new DriverService();
