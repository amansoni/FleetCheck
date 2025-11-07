import api from './api';

// Description: Get Driver Scorecard
// Endpoint: GET /api/scorecards/driver/:driverId
// Request: {}
// Response: { scorecard: { driverId: string, driverName: string, inspectionPerformance: object, trainingProgress: object, complianceStatus: object, recentActivity: object } }
export const getDriverScorecard = (driverId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        scorecard: {
          driverId,
          driverName: 'John Smith',
          inspectionPerformance: {
            totalCompleted: 24,
            passRate: 92,
            failRate: 8,
            averageIssuesPerInspection: 0.5,
            trend: [90, 92, 91, 93, 92, 94, 92],
          },
          trainingProgress: {
            totalEnrolled: 5,
            completed: 4,
            completionRate: 80,
            inProgress: 1,
            averageScore: 88,
          },
          complianceStatus: {
            overallScore: 89,
            trainingCompliance: 85,
            inspectionCompliance: 92,
            licenseExpiryStatus: 'Valid until 2025-12-31',
            outstandingRequirements: [],
          },
          recentActivity: {
            lastInspectionDate: '2024-01-20',
            lastInspectionResult: 'Pass',
            lastTrainingCompleted: 'Safety Training',
            lastTrainingDate: '2024-01-10',
            upcomingInspections: 2,
            upcomingTrainings: 1,
          },
        },
      });
    }, 500);
  });
};

// Description: Get All Drivers Scorecards Summary
// Endpoint: GET /api/scorecards/summary
// Request: {}
// Response: { scorecards: Array<{ driverId: string, driverName: string, complianceScore: number, inspectionPassRate: number, trainingCompletionRate: number }> }
export const getScorecardsSummary = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        scorecards: [
          {
            driverId: 'd1',
            driverName: 'John Smith',
            complianceScore: 89,
            inspectionPassRate: 92,
            trainingCompletionRate: 80,
          },
          {
            driverId: 'd2',
            driverName: 'Sarah Johnson',
            complianceScore: 85,
            inspectionPassRate: 88,
            trainingCompletionRate: 75,
          },
          {
            driverId: 'd3',
            driverName: 'Michael Brown',
            complianceScore: 78,
            inspectionPassRate: 82,
            trainingCompletionRate: 60,
          },
        ],
      });
    }, 500);
  });
};