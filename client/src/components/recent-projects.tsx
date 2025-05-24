import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus, Clock } from "lucide-react";
import { timeAgo, formatDuration, generateThumbnailUrl } from "@/lib/utils";
import type { VideoProject } from "@shared/schema";

export default function RecentProjects() {
  const { data: projects, isLoading } = useQuery<VideoProject[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <Card className="mt-12">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-text">Recent Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentProjects = projects?.slice(0, 3) || [];

  return (
    <Card className="mt-12">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-brand-text">Recent Projects</h2>
          <Button variant="ghost" className="text-brand-primary hover:text-brand-primary/80">
            View All Projects
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => {
                alert(`Opening project: ${project.title}\nStatus: ${project.status}\nDuration: ${formatDuration(project.duration)}`);
              }}
            >
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img 
                  src={project.thumbnailUrl || generateThumbnailUrl(project.id)}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(project.duration)}
                </div>
                {project.status === "generating" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-sm">Generating...</div>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-brand-text group-hover:text-brand-primary transition-colors truncate">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {timeAgo(project.createdAt || new Date())}
              </p>
            </div>
          ))}

          {/* New Project Card */}
          <div
            className="group cursor-pointer"
            onClick={() => {
              document.querySelector('textarea')?.focus();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="aspect-video gradient-brand rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-300">
              <div className="text-center text-white">
                <Plus className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">New Project</p>
              </div>
            </div>
            <h3 className="font-medium text-brand-text">Create New Video</h3>
            <p className="text-sm text-gray-500">Start from scratch</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
