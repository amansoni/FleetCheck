import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Truck, FileText, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDashboardAnalytics } from '@/api/reports';
import { useToast } from '@/hooks/useToast';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getDashboardAnalytics();
        setAnalytics(response.analytics);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard analytics',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#ef4444', '#f59e0b'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome back, {user?.email}</p>
      </div>

      {/* KPIs */}
      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="backdrop-blur-sm bg-white/50 border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                <Truck className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.kpis.totalVehicles}</div>
                <p className="text-xs text-muted-foreground">Active fleet</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.kpis.totalDrivers}</div>
                <p className="text-xs text-muted-foreground">Registered drivers</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inspections</CardTitle>
                <FileText className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.kpis.inspectionsCompleted}</div>
                <p className="text-xs text-muted-foreground">{analytics.kpis.inspectionPassRate}% pass rate</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.kpis.systemComplianceScore}%</div>
                <p className="text-xs text-muted-foreground">System score</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="inspections" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="inspections" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Inspection Frequency</CardTitle>
                    <CardDescription>Last 5 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analytics.inspectionAnalytics.frequencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="completed" stroke="#3b82f6" />
                        <Line type="monotone" dataKey="pending" stroke="#f59e0b" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Results Breakdown</CardTitle>
                    <CardDescription>Pass/Fail distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Pass', value: analytics.inspectionAnalytics.resultsBreakdown.pass },
                            { name: 'Fail', value: analytics.inspectionAnalytics.resultsBreakdown.fail },
                            { name: 'Conditional', value: analytics.inspectionAnalytics.resultsBreakdown.conditional },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                <CardHeader>
                  <CardTitle>Common Issues</CardTitle>
                  <CardDescription>Most frequently found issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.inspectionAnalytics.commonIssues}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="issue" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Completion Rate Trend</CardTitle>
                    <CardDescription>Last 5 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analytics.trainingAnalytics.completionRateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Course Enrollment</CardTitle>
                    <CardDescription>Active enrollments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.trainingAnalytics.courseEnrollment}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="enrollments" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Best performing drivers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analytics.driverPerformance.topPerformers.map((driver: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">{driver.driverName}</p>
                          <p className="text-sm text-muted-foreground">Score: {driver.complianceScore}%</p>
                        </div>
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Needs Attention</CardTitle>
                    <CardDescription>Drivers requiring action</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analytics.driverPerformance.needingAttention.map((driver: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium">{driver.driverName}</p>
                          <p className="text-sm text-muted-foreground">{driver.issue}</p>
                        </div>
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}