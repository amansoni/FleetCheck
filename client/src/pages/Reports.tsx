import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, TrendingUp, AlertCircle } from 'lucide-react';
import { getDashboardAnalytics, generateReport } from '@/api/reports';
import { useToast } from '@/hooks/useToast';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Analytics {
  kpis: Record<string, unknown>;
  inspectionAnalytics: Record<string, unknown>;
  trainingAnalytics: Record<string, unknown>;
  driverPerformance: Record<string, unknown>;
  vehicleStatus: Record<string, unknown>;
}

export function Reports() {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  const fetchAnalytics = async () => {
    try {
      const response = await getDashboardAnalytics();
      setAnalytics(response.analytics);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load analytics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [toast]);

  const handleGenerateReport = async () => {
    try {
      await generateReport({
        reportType: 'comprehensive',
        filters: { dateRange },
        format: 'pdf',
      });
      toast({
        title: 'Success',
        description: 'Report generated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate report',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#ef4444', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">System performance and compliance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport} className="gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {analytics && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="backdrop-blur-sm bg-white/50 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{analytics.kpis.totalVehicles}</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{analytics.kpis.totalDrivers}</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inspections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{analytics.kpis.inspectionsCompleted}</p>
                <p className="text-xs text-muted-foreground">{analytics.kpis.inspectionPassRate}% pass rate</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{analytics.kpis.systemComplianceScore}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="inspections" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            </TabsList>

            <TabsContent value="inspections" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Inspection Frequency</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.inspectionAnalytics.commonIssues}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="issue" angle={-45} textAnchor="end" height={80} />
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

            <TabsContent value="vehicles" className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                <CardHeader>
                  <CardTitle>Vehicles Due for Inspection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vehicle ID</TableHead>
                          <TableHead>Last Inspection</TableHead>
                          <TableHead>Days Since</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.vehicleStatus.dueForInspection.map((vehicle: { vehicleId: string; lastInspectionDate: string; daysSince: number; dueDate: string }, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{vehicle.vehicleId}</TableCell>
                            <TableCell>{vehicle.lastInspectionDate}</TableCell>
                            <TableCell>{vehicle.daysSince}</TableCell>
                            <TableCell>{vehicle.dueDate}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">Overdue</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}