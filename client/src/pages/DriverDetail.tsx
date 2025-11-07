import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { getDriverById } from '@/api/drivers';
import { useToast } from '@/hooks/useToast';

export function DriverDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        if (!id) return;
        const response = await getDriverById(id);
        setDriver(response.driver);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load driver details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Driver not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/drivers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{driver.firstName} {driver.lastName}</h1>
          <p className="text-muted-foreground">Driver Profile</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{driver.email}</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{driver.phone}</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Hire Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{driver.hireDate}</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              License
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{driver.licenseNumber}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vehicles">Assigned Vehicles</TabsTrigger>
          <TabsTrigger value="training">Training History</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Assigned Vehicles</CardTitle>
              <CardDescription>{driver.assignedVehicles.length} vehicles assigned</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle ID</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driver.assignedVehicles.map((vehicle: any) => (
                    <TableRow key={vehicle._id}>
                      <TableCell className="font-medium">{vehicle.vehicleId}</TableCell>
                      <TableCell>{vehicle.make}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Training History</CardTitle>
              <CardDescription>{driver.trainingHistory.length} courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driver.trainingHistory.map((training: any) => (
                    <TableRow key={training._id}>
                      <TableCell className="font-medium">{training.courseName}</TableCell>
                      <TableCell>
                        <Badge variant={training.status === 'Completed' ? 'default' : 'secondary'}>
                          {training.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{training.startDate}</TableCell>
                      <TableCell>{training.completionDate || '-'}</TableCell>
                      <TableCell>{training.score ? `${training.score}%` : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
              <CardDescription>{driver.inspectionHistory.length} inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form Name</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driver.inspectionHistory.map((inspection: any) => (
                    <TableRow key={inspection._id}>
                      <TableCell className="font-medium">{inspection.formName}</TableCell>
                      <TableCell>{inspection.vehicle}</TableCell>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{inspection.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={inspection.result === 'Pass' ? 'default' : 'destructive'}>
                          {inspection.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}