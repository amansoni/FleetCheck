import api from './api';

// Description: Get a list of Vehicles
// Endpoint: GET /api/vehicles
// Request: {}
// Response: { vehicles: Array<{ _id: string, vehicleId: string, make: string, model: string, year: number, status: string, assignedDrivers: number, lastInspectionDate: string }> }
export const getVehicles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        vehicles: [
          {
            _id: 'v1',
            vehicleId: 'VH001',
            make: 'Ford',
            model: 'Transit',
            year: 2022,
            status: 'Active',
            assignedDrivers: 2,
            lastInspectionDate: '2024-01-20',
          },
          {
            _id: 'v2',
            vehicleId: 'VH002',
            make: 'Mercedes',
            model: 'Sprinter',
            year: 2023,
            status: 'Active',
            assignedDrivers: 1,
            lastInspectionDate: '2024-01-18',
          },
          {
            _id: 'v3',
            vehicleId: 'VH003',
            make: 'Volkswagen',
            model: 'Crafter',
            year: 2021,
            status: 'Under Maintenance',
            assignedDrivers: 0,
            lastInspectionDate: '2024-01-10',
          },
        ],
      });
    }, 500);
  });
};

// Description: Get a single Vehicle by ID
// Endpoint: GET /api/vehicles/:id
// Request: {}
// Response: { vehicle: { _id: string, vehicleId: string, make: string, model: string, year: number, vin: string, licensePlate: string, status: string, purchaseDate: string, mileage: number, assignedDrivers: Array, inspectionHistory: Array, maintenanceNotes: Array } }
export const getVehicleById = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        vehicle: {
          _id: id,
          vehicleId: 'VH001',
          make: 'Ford',
          model: 'Transit',
          year: 2022,
          vin: 'WF0UXXWPXCE123456',
          licensePlate: 'ABC-1234',
          status: 'Active',
          purchaseDate: '2022-03-15',
          mileage: 45000,
          assignedDrivers: [
            { _id: 'd1', firstName: 'John', lastName: 'Smith', email: 'john.smith@company.com' },
            { _id: 'd2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@company.com' },
          ],
          inspectionHistory: [
            { _id: 'i1', formName: 'Pre-Trip Inspection', date: '2024-01-20', inspector: 'Mike Inspector', result: 'Pass', issuesFound: 0 },
            { _id: 'i2', formName: 'Monthly Safety Check', date: '2024-01-15', inspector: 'Jane Inspector', result: 'Pass', issuesFound: 1 },
          ],
          maintenanceNotes: [
            { _id: 'n1', note: 'Oil change completed', date: '2024-01-10', timestamp: '2024-01-10T10:30:00Z' },
            { _id: 'n2', note: 'Tire rotation performed', date: '2024-01-05', timestamp: '2024-01-05T14:15:00Z' },
          ],
        },
      });
    }, 500);
  });
};

// Description: Create a new Vehicle
// Endpoint: POST /api/vehicles
// Request: { vehicleId: string, make: string, model: string, year: number, vin: string, licensePlate: string, status: string, purchaseDate: string, mileage: number }
// Response: { success: boolean, message: string, vehicle: { _id: string } }
export const createVehicle = (data: {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: string;
  purchaseDate: string;
  mileage: number;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Vehicle created successfully',
        vehicle: { _id: 'new-vehicle-id' },
      });
    }, 500);
  });
};

// Description: Update a Vehicle
// Endpoint: PUT /api/vehicles/:id
// Request: { vehicleId: string, make: string, model: string, year: number, vin: string, licensePlate: string, status: string, purchaseDate: string, mileage: number }
// Response: { success: boolean, message: string }
export const updateVehicle = (id: string, data: {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: string;
  purchaseDate: string;
  mileage: number;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Vehicle updated successfully',
      });
    }, 500);
  });
};

// Description: Delete a Vehicle
// Endpoint: DELETE /api/vehicles/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteVehicle = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Vehicle deleted successfully',
      });
    }, 500);
  });
};