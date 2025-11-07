import api from './api';

// Description: Get Dashboard Analytics
// Endpoint: GET /api/reports/dashboard
// Request: {}
// Response: { analytics: { kpis: object, inspectionAnalytics: object, trainingAnalytics: object, driverPerformance: object, vehicleStatus: object } }
export const getDashboardAnalytics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analytics: {
          kpis: {
            totalVehicles: 15,
            totalDrivers: 25,
            inspectionsCompleted: 156,
            inspectionPassRate: 89,
            totalCourses: 8,
            trainingCompletionRate: 78,
            systemComplianceScore: 85,
          },
          inspectionAnalytics: {
            frequencyData: [
              { date: '2024-01-01', completed: 5, pending: 2 },
              { date: '2024-01-02', completed: 7, pending: 1 },
              { date: '2024-01-03', completed: 6, pending: 3 },
              { date: '2024-01-04', completed: 8, pending: 2 },
              { date: '2024-01-05', completed: 9, pending: 1 },
            ],
            resultsBreakdown: { pass: 139, fail: 14, conditional: 3 },
            commonIssues: [
              { issue: 'Tire Wear', count: 23 },
              { issue: 'Brake Fluid Low', count: 18 },
              { issue: 'Light Malfunction', count: 12 },
              { issue: 'Wiper Blade Wear', count: 10 },
              { issue: 'Battery Low', count: 8 },
            ],
            passRateByVehicle: [
              { vehicleId: 'VH001', passRate: 95 },
              { vehicleId: 'VH002', passRate: 92 },
              { vehicleId: 'VH003', passRate: 88 },
            ],
          },
          trainingAnalytics: {
            completionRateData: [
              { month: 'Jan', rate: 75 },
              { month: 'Feb', rate: 78 },
              { month: 'Mar', rate: 82 },
              { month: 'Apr', rate: 80 },
              { month: 'May', rate: 85 },
            ],
            courseEnrollment: [
              { course: 'Safety Training', enrollments: 25 },
              { course: 'Vehicle Maintenance', enrollments: 18 },
              { course: 'Emergency Procedures', enrollments: 15 },
            ],
            courseCompletion: [
              { course: 'Safety Training', completionRate: 92 },
              { course: 'Vehicle Maintenance', completionRate: 78 },
              { course: 'Emergency Procedures', completionRate: 87 },
            ],
          },
          driverPerformance: {
            topPerformers: [
              { driverName: 'John Smith', inspectionPassRate: 95, trainingCompletionRate: 100, complianceScore: 97 },
              { driverName: 'Sarah Johnson', inspectionPassRate: 92, trainingCompletionRate: 90, complianceScore: 91 },
            ],
            needingAttention: [
              { driverName: 'Michael Brown', issue: 'Low inspection pass rate', recommendation: 'Schedule refresher training' },
            ],
            complianceDistribution: { compliant: 20, partiallyCompliant: 4, nonCompliant: 1 },
          },
          vehicleStatus: {
            statusDistribution: { active: 12, inactive: 2, underMaintenance: 1 },
            dueForInspection: [
              { vehicleId: 'VH005', lastInspectionDate: '2023-12-15', daysSince: 37, dueDate: '2024-01-25' },
            ],
          },
        },
      });
    }, 500);
  });
};

// Description: Generate Report
// Endpoint: POST /api/reports/generate
// Request: { reportType: string, filters: object, format: string }
// Response: { success: boolean, message: string, reportUrl: string }
export const generateReport = (data: {
  reportType: string;
  filters: object;
  format: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Report generated successfully',
        reportUrl: '/reports/sample-report.pdf',
      });
    }, 500);
  });
};