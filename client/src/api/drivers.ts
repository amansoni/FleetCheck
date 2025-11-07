import api from './api';

// Description: Get a list of Drivers
// Endpoint: GET /api/drivers
// Request: {}
// Response: { drivers: Array<{ _id: string, firstName: string, lastName: string, email: string, phone: string, employmentStatus: string, assignedVehicles: number, trainingStatus: string, licenseNumber: string, licenseExpiryDate: string, hireDate: string }> }
export const getDrivers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        drivers: [
          {
            _id: '1',
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@company.com',
            phone: '+1-555-0101',
            employmentStatus: 'Active',
            assignedVehicles: 2,
            trainingStatus: 'Completed',
            licenseNumber: 'DL123456',
            licenseExpiryDate: '2025-12-31',
            hireDate: '2020-01-15',
          },
          {
            _id: '2',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@company.com',
            phone: '+1-555-0102',
            employmentStatus: 'Active',
            assignedVehicles: 1,
            trainingStatus: 'In Progress',
            licenseNumber: 'DL123457',
            licenseExpiryDate: '2026-06-30',
            hireDate: '2021-03-20',
          },
          {
            _id: '3',
            firstName: 'Michael',
            lastName: 'Brown',
            email: 'michael.brown@company.com',
            phone: '+1-555-0103',
            employmentStatus: 'On Leave',
            assignedVehicles: 0,
            trainingStatus: 'Not Started',
            licenseNumber: 'DL123458',
            licenseExpiryDate: '2024-09-15',
            hireDate: '2022-06-10',
          },
        ],
      });
    }, 500);
  });
};

// Description: Get a single Driver by ID
// Endpoint: GET /api/drivers/:id
// Request: {}
// Response: { driver: { _id: string, firstName: string, lastName: string, email: string, phone: string, employmentStatus: string, licenseNumber: string, licenseExpiryDate: string, hireDate: string, emergencyContactName: string, emergencyContactPhone: string, assignedVehicles: Array, trainingHistory: Array, inspectionHistory: Array } }
export const getDriverById = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        driver: {
          _id: id,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@company.com',
          phone: '+1-555-0101',
          employmentStatus: 'Active',
          licenseNumber: 'DL123456',
          licenseExpiryDate: '2025-12-31',
          hireDate: '2020-01-15',
          emergencyContactName: 'Jane Smith',
          emergencyContactPhone: '+1-555-0100',
          assignedVehicles: [
            { _id: 'v1', vehicleId: 'VH001', make: 'Ford', model: 'Transit', year: 2022 },
            { _id: 'v2', vehicleId: 'VH002', make: 'Mercedes', model: 'Sprinter', year: 2023 },
          ],
          trainingHistory: [
            { _id: 't1', courseName: 'Safety Training', status: 'Completed', startDate: '2023-01-10', completionDate: '2023-02-15', score: 95 },
            { _id: 't2', courseName: 'Vehicle Maintenance', status: 'In Progress', startDate: '2024-01-05', completionDate: null, score: null },
          ],
          inspectionHistory: [
            { _id: 'i1', formName: 'Pre-Trip Inspection', vehicle: 'VH001', date: '2024-01-20', status: 'Completed', result: 'Pass' },
            { _id: 'i2', formName: 'Monthly Safety Check', vehicle: 'VH002', date: '2024-01-18', status: 'Completed', result: 'Pass' },
          ],
        },
      });
    }, 500);
  });
};

// Description: Create a new Driver
// Endpoint: POST /api/drivers
// Request: { firstName: string, lastName: string, email: string, phone: string, employmentStatus: string, hireDate: string, licenseNumber: string, licenseExpiryDate: string, emergencyContactName: string, emergencyContactPhone: string }
// Response: { success: boolean, message: string, driver: { _id: string } }
export const createDriver = (data: {
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
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Driver created successfully',
        driver: { _id: 'new-driver-id' },
      });
    }, 500);
  });
};

// Description: Update a Driver
// Endpoint: PUT /api/drivers/:id
// Request: { firstName: string, lastName: string, email: string, phone: string, employmentStatus: string, hireDate: string, licenseNumber: string, licenseExpiryDate: string, emergencyContactName: string, emergencyContactPhone: string }
// Response: { success: boolean, message: string }
export const updateDriver = (id: string, data: {
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
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Driver updated successfully',
      });
    }, 500);
  });
};

// Description: Delete a Driver
// Endpoint: DELETE /api/drivers/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteDriver = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Driver deleted successfully',
      });
    }, 500);
  });
};