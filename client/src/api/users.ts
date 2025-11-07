import api from './api';

// Description: Get a list of Users
// Endpoint: GET /api/users
// Request: {}
// Response: { users: Array<{ _id: string, firstName: string, lastName: string, email: string, role: string, status: string, lastLogin: string }> }
export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: [
          {
            _id: 'u1',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@company.com',
            role: 'admin',
            status: 'Active',
            lastLogin: '2024-01-20T10:30:00Z',
          },
          {
            _id: 'u2',
            firstName: 'Manager',
            lastName: 'User',
            email: 'manager@company.com',
            role: 'manager',
            status: 'Active',
            lastLogin: '2024-01-20T09:15:00Z',
          },
          {
            _id: 'u3',
            firstName: 'Inspector',
            lastName: 'User',
            email: 'inspector@company.com',
            role: 'inspector',
            status: 'Active',
            lastLogin: '2024-01-19T14:45:00Z',
          },
        ],
      });
    }, 500);
  });
};

// Description: Create a new User
// Endpoint: POST /api/users
// Request: { firstName: string, lastName: string, email: string, role: string, password: string }
// Response: { success: boolean, message: string, user: { _id: string, email: string, temporaryPassword: string } }
export const createUser = (data: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'User created successfully',
        user: {
          _id: 'new-user-id',
          email: data.email,
          temporaryPassword: 'TempPass123!',
        },
      });
    }, 500);
  });
};

// Description: Update a User
// Endpoint: PUT /api/users/:id
// Request: { firstName: string, lastName: string, email: string, role: string, status: string }
// Response: { success: boolean, message: string }
export const updateUser = (id: string, data: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'User updated successfully',
      });
    }, 500);
  });
};

// Description: Delete a User
// Endpoint: DELETE /api/users/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteUser = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'User deleted successfully',
      });
    }, 500);
  });
};

// Description: Reset User Password
// Endpoint: POST /api/users/:id/reset-password
// Request: {}
// Response: { success: boolean, message: string, temporaryPassword: string }
export const resetUserPassword = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Password reset successfully',
        temporaryPassword: 'NewPass123!',
      });
    }, 500);
  });
};