import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Clock, Users, BookOpen } from 'lucide-react';
import { getTrainingCourseById } from '@/api/training';
import { useToast } from '@/hooks/useToast';

interface TrainingCourse {
  _id: string;
  name: string;
  description: string;
  duration: number;
  status: string;
  modules: Array<Record<string, unknown>>;
  completionRequirements: string;
  linkedInspectionForms: Array<string>;
  enrollmentStats: Record<string, unknown>;
}

export function TrainingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<TrainingCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        const response = await getTrainingCourseById(id);
        setCourse(response.course);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load course details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/training')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{course.duration}h</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{course.enrollmentStats.totalEnrolled}</p>
            <p className="text-xs text-muted-foreground">{course.enrollmentStats.completed} completed</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/50 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>
              {course.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="modules">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>{course.modules.length} modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.modules.map((module: any, idx: number) => (
                  <div key={module._id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{module.title}</h3>
                          {module.required && <Badge variant="outline">Required</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{module.type} • {module.duration} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card className="backdrop-blur-sm bg-white/50 border-white/20">
            <CardHeader>
              <CardTitle>Completion Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{course.completionRequirements}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}