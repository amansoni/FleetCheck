import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye, FileText } from 'lucide-react';
import { getInspectionForms, getInspectionAssignments, getInspectionHistory } from '@/api/inspections';
import { useToast } from '@/hooks/useToast';
import { InspectionFormModal } from '@/components/inspections/InspectionFormModal';

interface InspectionForm {
  _id: string;
  name: string;
  description: string;
  createdDate: string;
  lastModified: string;
  status: string;
  assignedVehiclesCount: number;
}

interface InspectionAssignment {
  _id: string;
  formName: string;
  vehicle: string;
  inspector: string;
  driver: string;
  dueDate: string;
  status: string;
}

interface InspectionRecord {
  _id: string;
  formName: string;
  vehicle: string;
  date: string;
  inspector: string;
  result: string;
  issuesCount: number;
}

export function Inspections() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [forms, setForms] = useState<InspectionForm[]>([]);
  const [assignments, setAssignments] = useState<InspectionAssignment[]>([]);
  const [history, setHistory] = useState<InspectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchData = async () => {
    try {
      const [formsRes, assignmentsRes, historyRes] = await Promise.all([
        getInspectionForms(),
        getInspectionAssignments(),
        getInspectionHistory(),
      ]);
      setForms(formsRes.forms);
      setAssignments(assignmentsRes.assignments);
      setHistory(historyRes.inspections);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load inspection data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
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
          <h1 className="text-3xl font-bold">Inspections</h1>
          <p className="text-muted-foreground">Manage inspection forms and assignments</p>
        </div>
        <Button onClick={() => setShowFormModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Form
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="forms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-4">
          {/* Search */}
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Search className="h-5 w-5 text-muted-foreground mt-2.5" />
                <Input
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Forms Table */}
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Inspection Forms</CardTitle>
              <CardDescription>{forms.length} forms available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vehicles</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())).map((form) => (
                      <TableRow key={form._id}>
                        <TableCell className="font-medium">{form.name}</TableCell>
                        <TableCell className="text-sm">{form.description}</TableCell>
                        <TableCell>
                          <Badge variant={form.status === 'Active' ? 'default' : 'secondary'}>
                            {form.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{form.assignedVehiclesCount}</TableCell>
                        <TableCell className="text-sm">{form.createdDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/inspections/${form._id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Inspection Assignments</CardTitle>
              <CardDescription>{assignments.length} assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment._id}>
                        <TableCell className="font-medium">{assignment.formName}</TableCell>
                        <TableCell>{assignment.vehicle}</TableCell>
                        <TableCell>{assignment.inspector}</TableCell>
                        <TableCell>{assignment.driver}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
              <CardDescription>{history.length} inspections completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Issues</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((inspection) => (
                      <TableRow key={inspection._id}>
                        <TableCell className="font-medium">{inspection.formName}</TableCell>
                        <TableCell>{inspection.vehicle}</TableCell>
                        <TableCell>{inspection.date}</TableCell>
                        <TableCell>{inspection.inspector}</TableCell>
                        <TableCell>
                          <Badge variant={inspection.result === 'Pass' ? 'default' : 'destructive'}>
                            {inspection.result}
                          </Badge>
                        </TableCell>
                        <TableCell>{inspection.issuesCount}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/inspections/report/${inspection._id}`)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
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

      {/* Modal */}
      <InspectionFormModal
        open={showFormModal}
        onOpenChange={setShowFormModal}
        onClose={() => {
          setShowFormModal(false);
          fetchData();
        }}
      />
    </div>
  );
}