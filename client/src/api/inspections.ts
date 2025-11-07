import api from './api';

// Description: Get a list of Inspection Forms
// Endpoint: GET /api/inspections/forms
// Request: {}
// Response: { forms: Array<{ _id: string, name: string, description: string, createdDate: string, lastModified: string, status: string, assignedVehiclesCount: number }> }
export const getInspectionForms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        forms: [
          {
            _id: 'f1',
            name: 'Pre-Trip Inspection',
            description: 'Daily vehicle inspection before trip',
            createdDate: '2023-12-01',
            lastModified: '2024-01-15',
            status: 'Active',
            assignedVehiclesCount: 5,
          },
          {
            _id: 'f2',
            name: 'Monthly Safety Check',
            description: 'Comprehensive monthly safety inspection',
            createdDate: '2023-11-15',
            lastModified: '2024-01-10',
            status: 'Active',
            assignedVehiclesCount: 3,
          },
        ],
      });
    }, 500);
  });
};

// Description: Get a single Inspection Form by ID
// Endpoint: GET /api/inspections/forms/:id
// Request: {}
// Response: { form: { _id: string, name: string, description: string, status: string, checklistItems: Array, trainingResources: Array, assignedVehicles: Array, assignedDrivers: Array } }
export const getInspectionFormById = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        form: {
          _id: id,
          name: 'Pre-Trip Inspection',
          description: 'Daily vehicle inspection before trip',
          status: 'Active',
          checklistItems: [
            { _id: 'c1', name: 'Tire Condition', type: 'Visual Check', required: true, helpText: 'Check for wear and damage' },
            { _id: 'c2', name: 'Brake Fluid Level', type: 'Measurement', required: true, helpText: 'Should be between min and max marks' },
            { _id: 'c3', name: 'Lights Working', type: 'Yes/No', required: true, helpText: 'Check all lights' },
          ],
          trainingResources: [
            { _id: 'r1', title: 'Tire Inspection Guide', url: 'https://example.com/tire-guide', type: 'Document', description: 'Complete guide to tire inspection' },
          ],
          assignedVehicles: ['VH001', 'VH002', 'VH003'],
          assignedDrivers: ['d1', 'd2', 'd3'],
        },
      });
    }, 500);
  });
};

// Description: Get all Inspection Assignments
// Endpoint: GET /api/inspections/assignments
// Request: {}
// Response: { assignments: Array<{ _id: string, formName: string, vehicle: string, inspector: string, driver: string, dueDate: string, status: string }> }
export const getInspectionAssignments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assignments: [
          {
            _id: 'a1',
            formName: 'Pre-Trip Inspection',
            vehicle: 'VH001',
            inspector: 'Mike Inspector',
            driver: 'John Smith',
            dueDate: '2024-01-25',
            status: 'Pending',
          },
          {
            _id: 'a2',
            formName: 'Monthly Safety Check',
            vehicle: 'VH002',
            inspector: 'Jane Inspector',
            driver: 'Sarah Johnson',
            dueDate: '2024-01-22',
            status: 'In Progress',
          },
        ],
      });
    }, 500);
  });
};

// Description: Get Inspection History
// Endpoint: GET /api/inspections/history
// Request: {}
// Response: { inspections: Array<{ _id: string, formName: string, vehicle: string, date: string, inspector: string, result: string, issuesCount: number }> }
export const getInspectionHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        inspections: [
          {
            _id: 'i1',
            formName: 'Pre-Trip Inspection',
            vehicle: 'VH001',
            date: '2024-01-20',
            inspector: 'Mike Inspector',
            result: 'Pass',
            issuesCount: 0,
          },
          {
            _id: 'i2',
            formName: 'Monthly Safety Check',
            vehicle: 'VH002',
            date: '2024-01-18',
            inspector: 'Jane Inspector',
            result: 'Pass',
            issuesCount: 1,
          },
        ],
      });
    }, 500);
  });
};

// Description: Get Inspection Report by ID
// Endpoint: GET /api/inspections/:id
// Request: {}
// Response: { inspection: { _id: string, formName: string, vehicle: object, driver: object, date: string, mileage: number, checklistResults: Array, issuesFound: Array, overallResult: string, inspectorSignature: string, timestamp: string } }
export const getInspectionById = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        inspection: {
          _id: id,
          formName: 'Pre-Trip Inspection',
          vehicle: { vehicleId: 'VH001', make: 'Ford', model: 'Transit', year: 2022 },
          driver: { firstName: 'John', lastName: 'Smith', email: 'john.smith@company.com' },
          date: '2024-01-20',
          mileage: 45000,
          checklistResults: [
            { itemName: 'Tire Condition', result: 'Pass', notes: 'All tires in good condition' },
            { itemName: 'Brake Fluid Level', result: 'Pass', notes: 'Level is normal' },
          ],
          issuesFound: [
            { issue: 'Minor scratch on bumper', severity: 'Low', description: 'Small cosmetic damage' },
          ],
          overallResult: 'Pass',
          inspectorSignature: 'Mike Inspector',
          timestamp: '2024-01-20T10:30:00Z',
        },
      });
    }, 500);
  });
};

// Description: Create a new Inspection Form
// Endpoint: POST /api/inspections/forms
// Request: { name: string, description: string, status: string, checklistItems: Array, trainingResources: Array, assignedVehicles: Array, assignedDrivers: Array }
// Response: { success: boolean, message: string, form: { _id: string } }
export const createInspectionForm = (data: {
  name: string;
  description: string;
  status: string;
  checklistItems: Array<Record<string, unknown>>;
  trainingResources: Array<Record<string, unknown>>;
  assignedVehicles: Array<string>;
  assignedDrivers: Array<string>;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Inspection form created successfully',
        form: { _id: 'new-form-id' },
      });
    }, 500);
  });
};

// Description: Submit an Inspection
// Endpoint: POST /api/inspections
// Request: { formId: string, vehicleId: string, driverId: string, mileage: number, checklistResults: Array, issuesFound: Array, overallResult: string, inspectorSignature: string }
// Response: { success: boolean, message: string, inspection: { _id: string } }
export const submitInspection = (data: {
  formId: string;
  vehicleId: string;
  driverId: string;
  mileage: number;
  checklistResults: Array<Record<string, unknown>>;
  issuesFound: Array<Record<string, unknown>>;
  overallResult: string;
  inspectorSignature: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Inspection submitted successfully',
        inspection: { _id: 'new-inspection-id' },
      });
    }, 500);
  });
};