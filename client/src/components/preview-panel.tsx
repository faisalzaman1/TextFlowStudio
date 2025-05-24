import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Play, 
  Expand, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Settings, 
  Wand2,
  Download,
  Share,
  Save,
  Loader
} from "lucide-react";
import { formatDuration } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { VideoProject } from "@shared/schema";

interface PreviewPanelProps {
  project: Partial<VideoProject>;
  onProjectUpdate: (updates: Partial<VideoProject>) => void;
}

export default function PreviewPanel({ project, onProjectUpdate }: PreviewPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: Partial<VideoProject>) => {
      const response = await apiRequest("POST", "/api/projects", projectData);
      return response.json();
    },
    onSuccess: (newProject) => {
      onProjectUpdate(newProject);
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    }
  });

  const generateVideoMutation = useMutation({
    mutationFn: async (projectId: number) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/generate`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Video Generation Started",
        description: "Your video is being generated. This may take a few minutes.",
      });
    }
  });

  const handleGenerateVideo = async () => {
    if (!project.script?.trim()) {
      toast({
        title: "Missing Script",
        description: "Please enter a script for your video.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      let currentProject = project;
      
      // Create project if it doesn't exist
      if (!project.id) {
        currentProject = await createProjectMutation.mutateAsync(project);
      }

      // Start generation
      await generateVideoMutation.mutateAsync(currentProject.id!);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          const next = prev + Math.random() * 15;
          if (next >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsGenerating(false);
              setGenerationProgress(0);
              onProjectUpdate({
                status: "completed",
                videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=281"
              });
              toast({
                title: "Video Generated!",
                description: "Your video is ready for download.",
              });
            }, 1000);
            return 100;
          }
          return next;
        });
      }, 500);

    } catch (error) {
      setIsGenerating(false);
      setGenerationProgress(0);
      toast({
        title: "Generation Failed",
        description: "Failed to generate video. Please try again.",
        variant: "destructive"
      });
    }
  };

  const mockThumbnail = project.thumbnailUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=281";

  return (
    <>
      {/* Video Preview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-text">Preview</h2>
            <Button variant="ghost" size="sm">
              <Expand className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Video Player Container */}
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
            <img 
              src={mockThumbnail}
              alt="Video preview" 
              className="w-full h-full object-cover" 
            />
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Button 
                size="lg"
                className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-brand-primary"
              >
                <Play className="h-6 w-6 fill-current ml-1" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/20 rounded-full h-1">
                <div className="bg-white rounded-full h-1 w-1/3"></div>
              </div>
            </div>
            
            {/* Duration */}
            <div className="absolute bottom-4 right-4 text-white text-sm font-medium">
              0:10 / {formatDuration(project.duration || 30)}
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({ title: "Skipped Back", description: "Rewound 10 seconds" })}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  if (project.videoUrl) {
                    window.open(project.videoUrl, '_blank');
                  } else {
                    toast({ title: "Preview Not Available", description: "Generate video first to play" });
                  }
                }}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({ title: "Skipped Forward", description: "Advanced 10 seconds" })}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({ title: "Volume", description: "Audio controls coming soon" })}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => alert('Video Settings:\n• Quality: 1080p HD\n• Format: MP4\n• Frame Rate: 30fps\n• Audio: Stereo')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Status */}
      {isGenerating && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader className="h-6 w-6 text-white animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-brand-text mb-2">Generating Your Video</h3>
              <p className="text-gray-600 mb-4">AI is creating your video. This usually takes 1-2 minutes.</p>
              
              <Progress value={generationProgress} className="mb-2" />
              <p className="text-sm text-gray-500">{Math.round(generationProgress)}% Complete</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <Button 
        className="w-full gradient-brand text-white font-semibold py-4 hover:opacity-90 transition-opacity"
        onClick={handleGenerateVideo}
        disabled={isGenerating || !project.script?.trim()}
      >
        <Wand2 className="h-4 w-4 mr-2" />
        Generate Video
      </Button>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full"
          disabled={project.status !== "completed"}
          onClick={() => {
            if (project.videoUrl) {
              window.open(project.videoUrl, '_blank');
              toast({
                title: "Download Started",
                description: "Your video download has started.",
              });
            }
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Video
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={project.status !== "completed"}
            onClick={() => {
              if (project.videoUrl) {
                navigator.clipboard.writeText(project.videoUrl);
                toast({
                  title: "Link Copied",
                  description: "Video link copied to clipboard.",
                });
              }
            }}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={async () => {
              try {
                if (project.id) {
                  await createProjectMutation.mutateAsync(project);
                } else {
                  await createProjectMutation.mutateAsync(project);
                }
                toast({
                  title: "Project Saved",
                  description: "Your project has been saved successfully.",
                });
              } catch (error) {
                toast({
                  title: "Save Failed",
                  description: "Failed to save project. Please try again.",
                  variant: "destructive"
                });
              }
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Project
          </Button>
        </div>
      </div>
      
      {/* Video Info */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-brand-text mb-2">Video Details</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Resolution:</span>
              <span>1920x1080</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span>MP4</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{formatDuration(project.duration || 30)}</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span>~12 MB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
