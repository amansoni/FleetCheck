import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Truck, Calendar, Gauge } from 'lucide-react';
import { getVehicleById } from '@/api/vehicles';
import { useToast } from '@/hooks/useToast';

interface Vehicle {
  _id: string;
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: string;
  purchaseDate: string;
  mileage: number;
  assignedDrivers: Array<Record<string, unknown>>;
  inspectionHistory: Array<Record<string, unknown>>;
  maintenanceNotes: Array<Record<string, unknown>>;
}

export function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (!id) return;
        const response = await getVehicleById(id);
        setVehicle(response.vehicle);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load vehicle details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Vehicle not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/vehicles')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{vehicle.make} {vehicle.model}</h1>
          <p className="text-muted-foreground">Vehicle ID: {vehicle.vehicleId}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Truck className="h-4 w-4" />
              License Plate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-mono">{vehicle.licensePlate}</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{vehicle.year}</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Mileage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{vehicle.mileage.toLocaleString()} km</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'}>
              {vehicle.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="drivers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drivers">Assigned Drivers</TabsTrigger>
          <TabsTrigger value="inspections">Inspection History</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Assigned Drivers</CardTitle>
              <CardDescription>{vehicle.assignedDrivers.length} drivers assigned</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicle.assignedDrivers.map((driver: { _id: string; firstName: string; lastName: string; email: string }) => (
                    <TableRow key={driver._id}>
                      <TableCell className="font-medium">{driver.firstName} {driver.lastName}</TableCell>
                      <TableCell>{driver.email}</TableCell>
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
              <CardDescription>{vehicle.inspectionHistory.length} inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicle.inspectionHistory.map((inspection: { _id: string; formName: string; date: string; inspector: string; result: string; issuesFound: number }) => (
                    <TableRow key={inspection._id}>
                      <TableCell className="font-medium">{inspection.formName}</TableCell>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>
                        <Badge variant={inspection.result === 'Pass' ? 'default' : 'destructive'}>
                          {inspection.result}
                        </Badge>
                      </TableCell>
                      <TableCell>{inspection.issuesFound}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Maintenance Notes</CardTitle>
              <CardDescription>{vehicle.maintenanceNotes.length} notes recorded</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicle.maintenanceNotes.map((note: { _id: string; note: string; date: string }) => (
                <div key={note._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">{note.note}</p>
                    <span className="text-sm text-muted-foreground">{note.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}