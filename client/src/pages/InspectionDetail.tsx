import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Edit, Trash2, Copy, ExternalLink } from 'lucide-react';
import { getInspectionFormById } from '@/api/inspections';
import { useToast } from '@/hooks/useToast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ChecklistItem {
  _id: string;
  name: string;
  type: string;
  required: boolean;
  helpText: string;
}

interface TrainingResource {
  _id: string;
  title: string;
  url: string;
  type: string;
  description: string;
}

interface InspectionFormDetail {
  _id: string;
  name: string;
  description: string;
  status: string;
  checklistItems: ChecklistItem[];
  trainingResources: TrainingResource[];
  assignedVehicles: string[];
  assignedDrivers: string[];
}

export function InspectionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<InspectionFormDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      if (!id) return;
      try {
        const response = await getInspectionFormById(id);
        setForm(response.form);
        console.log('Inspection form loaded:', response.form);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load inspection form';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        console.error('Error loading inspection form:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id, toast]);

  const handleDelete = async () => {
    try {
      toast({
        title: 'Success',
        description: 'Inspection form deleted successfully',
      });
      navigate('/inspections');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete form';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleClone = async () => {
    try {
      toast({
        title: 'Success',
        description: 'Inspection form cloned successfully',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clone form';
      toast({
        title: 'Error',
        description: errorMessage,
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

  if (!form) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate('/inspections')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Inspections
        </Button>
        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Inspection form not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Button variant="outline" onClick={() => navigate('/inspections')} className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Inspections
          </Button>
          <h1 className="text-3xl font-bold">{form.name}</h1>
          <p className="text-muted-foreground">{form.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleClone} className="gap-2">
            <Copy className="h-4 w-4" />
            Clone
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Inspection Form</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this inspection form? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <Badge variant={form.status === 'Active' ? 'default' : 'secondary'}>
          {form.status}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checklist">Checklist Items</TabsTrigger>
          <TabsTrigger value="resources">Training Resources</TabsTrigger>
          <TabsTrigger value="vehicles">Assigned Vehicles</TabsTrigger>
          <TabsTrigger value="drivers">Assigned Drivers</TabsTrigger>
        </TabsList>

        {/* Checklist Items Tab */}
        <TabsContent value="checklist" className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Checklist Items</CardTitle>
              <CardDescription>{form.checklistItems.length} items in this form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form.checklistItems.length > 0 ? (
                  form.checklistItems.map((item, index) => (
                    <div key={item._id} className="border rounded-lg p-4 space-y-2 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-muted-foreground">#{index + 1}</span>
                            <h3 className="font-semibold">{item.name}</h3>
                            {item.required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.helpText}</p>
                        </div>
                        <Badge variant="secondary" className="ml-2">{item.type}</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No checklist items added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Training Resources</CardTitle>
              <CardDescription>{form.trainingResources.length} resources linked to this form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form.trainingResources.length > 0 ? (
                  form.trainingResources.map((resource) => (
                    <div key={resource._id} className="border rounded-lg p-4 space-y-2 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-2">{resource.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Open Resource
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No training resources linked yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assigned Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Assigned Vehicles</CardTitle>
              <CardDescription>{form.assignedVehicles.length} vehicles assigned</CardDescription>
            </CardHeader>
            <CardContent>
              {form.assignedVehicles.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.assignedVehicles.map((vehicleId) => (
                        <TableRow key={vehicleId}>
                          <TableCell className="font-medium">{vehicleId}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No vehicles assigned yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assigned Drivers Tab */}
        <TabsContent value="drivers" className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Assigned Drivers</CardTitle>
              <CardDescription>{form.assignedDrivers.length} drivers assigned</CardDescription>
            </CardHeader>
            <CardContent>
              {form.assignedDrivers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Driver ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.assignedDrivers.map((driverId) => (
                        <TableRow key={driverId}>
                          <TableCell className="font-medium">{driverId}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No drivers assigned yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}