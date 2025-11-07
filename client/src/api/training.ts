import api from './api';

// Description: Get a list of Training Courses
// Endpoint: GET /api/training/courses
// Request: {}
// Response: { courses: Array<{ _id: string, name: string, description: string, duration: number, status: string, enrollmentsCount: number, completionRate: number }> }
export const getTrainingCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        courses: [
          {
            _id: 'tc1',
            name: 'Safety Training',
            description: 'Comprehensive safety training for all drivers',
            duration: 8,
            status: 'Active',
            enrollmentsCount: 15,
            completionRate: 87,
          },
          {
            _id: 'tc2',
            name: 'Vehicle Maintenance',
            description: 'Basic vehicle maintenance and care',
            duration: 4,
            status: 'Active',
            enrollmentsCount: 10,
            completionRate: 70,
          },
        ],
      });
    }, 500);
  });
};

// Description: Get a single Training Course by ID
// Endpoint: GET /api/training/courses/:id
// Request: {}
// Response: { course: { _id: string, name: string, description: string, duration: number, status: string, modules: Array, completionRequirements: string, linkedInspectionForms: Array, enrollmentStats: object } }
export const getTrainingCourseById = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        course: {
          _id: id,
          name: 'Safety Training',
          description: 'Comprehensive safety training for all drivers',
          duration: 8,
          status: 'Active',
          modules: [
            { _id: 'm1', title: 'Introduction to Safety', type: 'Video', duration: 30, required: true },
            { _id: 'm2', title: 'Emergency Procedures', type: 'Document', duration: 45, required: true },
            { _id: 'm3', title: 'Safety Quiz', type: 'Quiz', duration: 20, required: true },
          ],
          completionRequirements: 'All modules must be completed with minimum 80% score on quiz',
          linkedInspectionForms: ['f1', 'f2'],
          enrollmentStats: { totalEnrolled: 15, completed: 13, inProgress: 2 },
        },
      });
    }, 500);
  });
};

// Description: Get Driver's Training Progress
// Endpoint: GET /api/training/driver/:driverId
// Request: {}
// Response: { trainings: Array<{ _id: string, courseName: string, status: string, enrollmentDate: string, completionDate: string, score: number, progress: number }> }
export const getDriverTrainingProgress = (driverId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trainings: [
          {
            _id: 't1',
            courseName: 'Safety Training',
            status: 'Completed',
            enrollmentDate: '2023-12-01',
            completionDate: '2024-01-10',
            score: 95,
            progress: 100,
          },
          {
            _id: 't2',
            courseName: 'Vehicle Maintenance',
            status: 'In Progress',
            enrollmentDate: '2024-01-05',
            completionDate: null,
            score: null,
            progress: 60,
          },
        ],
      });
    }, 500);
  });
};

// Description: Enroll Driver in Course
// Endpoint: POST /api/training/enroll
// Request: { driverId: string, courseId: string }
// Response: { success: boolean, message: string }
export const enrollInCourse = (data: { driverId: string; courseId: string }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Enrolled in course successfully',
      });
    }, 500);
  });
};

// Description: Complete Training Module
// Endpoint: POST /api/training/complete-module
// Request: { enrollmentId: string, moduleId: string, score: number }
// Response: { success: boolean, message: string }
export const completeTrainingModule = (data: {
  enrollmentId: string;
  moduleId: string;
  score: number;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Module completed successfully',
      });
    }, 500);
  });
};