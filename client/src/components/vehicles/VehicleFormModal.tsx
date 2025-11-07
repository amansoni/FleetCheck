import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { createVehicle, updateVehicle } from '@/api/vehicles';
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
}

interface VehicleFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle;
  onClose: () => void;
}

export function VehicleFormModal({ open, onOpenChange, vehicle, onClose }: VehicleFormModalProps) {
  const { toast } = useToast();
  const { register, handleSubmit, reset, watch } = useForm<Vehicle>({
    defaultValues: vehicle || {
      _id: '',
      vehicleId: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      licensePlate: '',
      status: 'Active',
      purchaseDate: '',
      mileage: 0,
    },
  });

  const onSubmit = async (data: Vehicle) => {
    try {
      if (vehicle) {
        await updateVehicle(vehicle._id, data);
        toast({
          title: 'Success',
          description: 'Vehicle updated successfully',
        });
      } else {
        await createVehicle(data);
        toast({
          title: 'Success',
          description: 'Vehicle created successfully',
        });
      }
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save vehicle';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
          <DialogDescription>
            {vehicle ? 'Update vehicle information' : 'Create a new vehicle profile'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleId">Vehicle ID</Label>
              <Input id="vehicleId" {...register('vehicleId', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input id="licensePlate" {...register('licensePlate', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" {...register('make', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" {...register('model', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" {...register('year', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vin">VIN</Label>
              <Input id="vin" {...register('vin', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={watch('status')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input id="purchaseDate" type="date" {...register('purchaseDate', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input id="mileage" type="number" {...register('mileage', { required: true })} />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {vehicle ? 'Update' : 'Create'} Vehicle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}