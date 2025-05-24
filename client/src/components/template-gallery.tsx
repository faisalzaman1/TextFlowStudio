import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Youtube, Palette, Building, Gamepad2 } from "lucide-react";
import { useState } from "react";
import type { Template } from "@shared/schema";

interface TemplateGalleryProps {
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
}

export default function TemplateGallery({ selectedTemplate, onTemplateSelect }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const categories = [
    { key: null, label: "All", icon: null },
    { key: "youtube", label: "YouTube", icon: Youtube },
    { key: "creative", label: "Creative", icon: Palette },
    { key: "corporate", label: "Business", icon: Building },
    { key: "gaming", label: "Gaming", icon: Gamepad2 }
  ];

  const filteredTemplates = templates?.filter(template => 
    !selectedCategory || template.category === selectedCategory
  ) || [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "youtube": return Youtube;
      case "creative": return Palette;
      case "corporate": return Building;
      case "gaming": return Gamepad2;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-text">Choose Template</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-templates>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-brand-text">Choose Template</h2>
          <Button variant="ghost" className="text-brand-primary hover:text-brand-primary/80">
            View All ({templates?.length || 0})
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="flex items-center gap-1"
              >
                {IconComponent && <IconComponent className="h-3 w-3" />}
                {category.label}
              </Button>
            );
          })}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => {
            const CategoryIcon = getCategoryIcon(template.category);
            return (
              <div
                key={template.id}
                className="group cursor-pointer"
                onClick={() => onTemplateSelect(template)}
              >
                <div className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedTemplate?.id === template.id 
                    ? 'border-brand-primary' 
                    : 'border-gray-200 hover:border-brand-primary'
                }`}>
                  <img 
                    src={template.thumbnailUrl}
                    alt={`${template.name} template`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                      {CategoryIcon && <CategoryIcon className="h-3 w-3 mr-1" />}
                      {template.category}
                    </Badge>
                  </div>
                  
                  {selectedTemplate?.id === template.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-4 h-4 text-brand-primary bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-brand-text">{template.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No templates found in this category.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
