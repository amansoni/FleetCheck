import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Download, Printer } from 'lucide-react';
import { getDriverScorecard, getScorecardsSummary } from '@/api/scorecards';
import { useToast } from '@/hooks/useToast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Scorecard {
  driverId: string;
  driverName: string;
  complianceScore: number;
  inspectionPassRate: number;
  trainingCompletionRate: number;
}

interface DriverScorecard {
  driverId: string;
  driverName: string;
  inspectionPerformance: Record<string, unknown>;
  trainingProgress: Record<string, unknown>;
  complianceStatus: Record<string, unknown>;
  recentActivity: Record<string, unknown>;
}

export function Scorecards() {
  const { toast } = useToast();
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string>('d1');
  const [driverScorecard, setDriverScorecard] = useState<DriverScorecard | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getScorecardsSummary();
      setScorecards(response.scorecards);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load scorecards',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDriverScorecard = async (driverId: string) => {
    try {
      const response = await getDriverScorecard(driverId);
      setDriverScorecard(response.scorecard);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load driver scorecard',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  useEffect(() => {
    if (selectedDriver) {
      fetchDriverScorecard(selectedDriver);
    }
  }, [selectedDriver, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Driver Scorecards</h1>
        <p className="text-muted-foreground">Track driver performance and compliance</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="detail">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>All Drivers Summary</CardTitle>
              <CardDescription>{scorecards.length} drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver Name</TableHead>
                      <TableHead>Compliance Score</TableHead>
                      <TableHead>Inspection Pass Rate</TableHead>
                      <TableHead>Training Completion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scorecards.map((scorecard) => (
                      <TableRow key={scorecard.driverId}>
                        <TableCell className="font-medium">{scorecard.driverName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={scorecard.complianceScore} className="w-24 h-2" />
                            <span className="text-sm font-medium">{scorecard.complianceScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={scorecard.inspectionPassRate} className="w-24 h-2" />
                            <span className="text-sm font-medium">{scorecard.inspectionPassRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={scorecard.trainingCompletionRate} className="w-24 h-2" />
                            <span className="text-sm font-medium">{scorecard.trainingCompletionRate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail" className="space-y-4">
          {/* Driver Selection */}
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardContent className="pt-6">
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scorecards.map((scorecard) => (
                    <SelectItem key={scorecard.driverId} value={scorecard.driverId}>
                      {scorecard.driverName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {driverScorecard && (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Inspections Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{driverScorecard.inspectionPerformance.totalCompleted}</p>
                    <p className="text-xs text-muted-foreground">{driverScorecard.inspectionPerformance.passRate}% pass rate</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{driverScorecard.trainingProgress.completed}/{driverScorecard.trainingProgress.totalEnrolled}</p>
                    <p className="text-xs text-muted-foreground">{driverScorecard.trainingProgress.completionRate}% complete</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{driverScorecard.complianceStatus.overallScore}%</p>
                    <p className="text-xs text-muted-foreground">Overall compliance</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">License Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="default" className="text-xs">Valid</Badge>
                    <p className="text-xs text-muted-foreground mt-2">{driverScorecard.complianceStatus.licenseExpiryStatus}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Inspection Pass Rate Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={driverScorecard.inspectionPerformance.trend.map((rate: number, idx: number) => ({
                        day: idx + 1,
                        rate
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">Last Inspection</p>
                      <p className="text-xs text-muted-foreground">{driverScorecard.recentActivity.lastInspectionDate}</p>
                      <Badge variant="default" className="mt-2 text-xs">{driverScorecard.recentActivity.lastInspectionResult}</Badge>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium">Last Training</p>
                      <p className="text-xs text-muted-foreground">{driverScorecard.recentActivity.lastTrainingCompleted}</p>
                      <p className="text-xs text-muted-foreground mt-1">{driverScorecard.recentActivity.lastTrainingDate}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* History Tables */}
              <Tabs defaultValue="inspections" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="inspections">Inspection History</TabsTrigger>
                  <TabsTrigger value="training">Training History</TabsTrigger>
                </TabsList>

                <TabsContent value="inspections">
                  <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                    <CardHeader>
                      <CardTitle>Recent Inspections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Vehicle</TableHead>
                              <TableHead>Form</TableHead>
                              <TableHead>Result</TableHead>
                              <TableHead>Issues</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* Mock data - would come from API */}
                            <TableRow>
                              <TableCell>2024-01-20</TableCell>
                              <TableCell>VH001</TableCell>
                              <TableCell>Pre-Trip</TableCell>
                              <TableCell><Badge variant="default">Pass</Badge></TableCell>
                              <TableCell>0</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="training">
                  <Card className="backdrop-blur-sm bg-white/50 border-white/20">
                    <CardHeader>
                      <CardTitle>Training History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Enrollment Date</TableHead>
                              <TableHead>Completion Date</TableHead>
                              <TableHead>Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* Mock data - would come from API */}
                            <TableRow>
                              <TableCell>Safety Training</TableCell>
                              <TableCell><Badge variant="default">Completed</Badge></TableCell>
                              <TableCell>2023-12-01</TableCell>
                              <TableCell>2024-01-10</TableCell>
                              <TableCell>95%</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Export Options */}
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}