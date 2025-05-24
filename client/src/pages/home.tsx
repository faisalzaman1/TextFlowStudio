import Header from "@/components/header";
import TextInputPanel from "@/components/text-input-panel";
import PreviewPanel from "@/components/preview-panel";
import TemplateGallery from "@/components/template-gallery";
import RecentProjects from "@/components/recent-projects";
import Footer from "@/components/footer";
import { useState } from "react";
import type { VideoProject, Template } from "@shared/schema";

export default function Home() {
  const [currentProject, setCurrentProject] = useState<Partial<VideoProject>>({
    title: "Untitled Project",
    script: "Transform your business with cutting-edge AI technology. Our platform helps companies automate processes, increase efficiency, and drive innovation. Join thousands of satisfied customers who have revolutionized their operations.",
    duration: 30,
    style: "modern",
    aspectRatio: "16:9",
    voiceOver: "ai_female",
    template: "business",
    status: "draft"
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleProjectUpdate = (updates: Partial<VideoProject>) => {
    setCurrentProject(prev => ({ ...prev, ...updates }));
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    handleProjectUpdate({ template: template.name.toLowerCase() });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TextInputPanel 
              project={currentProject}
              onProjectUpdate={handleProjectUpdate}
            />
            <TemplateGallery 
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
            />
          </div>
          
          <div className="space-y-6">
            <PreviewPanel 
              project={currentProject}
              onProjectUpdate={handleProjectUpdate}
            />
          </div>
        </div>

        <RecentProjects />
      </main>

      <Footer />
    </div>
  );
}
