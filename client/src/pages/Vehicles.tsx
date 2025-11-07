import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { getVehicles, deleteVehicle } from '@/api/vehicles';
import { useToast } from '@/hooks/useToast';
import { VehicleFormModal } from '@/components/vehicles/VehicleFormModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface Vehicle {
  _id: string;
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  status: string;
  assignedDrivers: number;
  lastInspectionDate: string;
}

export function Vehicles() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response.vehicles);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load vehicles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [toast]);

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicle(id);
      setVehicles(vehicles.filter(v => v._id !== id));
      toast({
        title: 'Success',
        description: 'Vehicle deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete vehicle',
        variant: 'destructive',
      });
    }
    setDeleteConfirm(null);
  };

  const handleFormClose = () => {
    setShowFormModal(false);
    setEditingVehicle(null);
    fetchVehicles();
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Under Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vehicles</h1>
          <p className="text-muted-foreground">Manage your vehicle fleet</p>
        </div>
        <Button onClick={() => setShowFormModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Search */}
      <Card className="backdrop-blur-sm bg-white/50 border-white/20">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Search className="h-5 w-5 text-muted-foreground mt-2.5" />
            <Input
              placeholder="Search by ID, make, or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="backdrop-blur-sm bg-white/50 border-white/20">
        <CardHeader>
          <CardTitle>Vehicle List</CardTitle>
          <CardDescription>{filteredVehicles.length} vehicles found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Drivers</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle._id}>
                    <TableCell className="font-medium">{vehicle.vehicleId}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.assignedDrivers}</TableCell>
                    <TableCell>{vehicle.lastInspectionDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingVehicle(vehicle);
                            setShowFormModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(vehicle._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <VehicleFormModal
        open={showFormModal}
        onOpenChange={setShowFormModal}
        vehicle={editingVehicle}
        onClose={handleFormClose}
      />

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}