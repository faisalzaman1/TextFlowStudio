import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand2, CheckSquare, Lightbulb, Upload, Mic } from "lucide-react";
import { useState } from "react";
import type { VideoProject } from "@shared/schema";

interface TextInputPanelProps {
  project: Partial<VideoProject>;
  onProjectUpdate: (updates: Partial<VideoProject>) => void;
}

export default function TextInputPanel({ project, onProjectUpdate }: TextInputPanelProps) {
  const [characterCount, setCharacterCount] = useState(project.script?.length || 0);

  const handleScriptChange = (value: string) => {
    setCharacterCount(value.length);
    onProjectUpdate({ script: value });
  };

  const handleAspectRatioSelect = (ratio: string) => {
    onProjectUpdate({ aspectRatio: ratio });
  };

  return (
    <>
      {/* Project Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-brand-text">Create Your Video</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Auto-save enabled</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Text Input Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-brand-text">Video Script</Label>
            <div className="relative">
              <Textarea 
                className="min-h-40 resize-none"
                placeholder="Enter your text here to generate a video. Describe what you want to see, and our AI will create an engaging video for you..."
                value={project.script || ""}
                onChange={(e) => handleScriptChange(e.target.value)}
                maxLength={1000}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {characterCount}/1000 characters
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  const enhanced = project.script + " This content has been enhanced with more engaging language and compelling storytelling elements.";
                  onProjectUpdate({ script: enhanced });
                  setCharacterCount(enhanced.length);
                }}
              >
                <Wand2 className="h-3 w-3 mr-1" />
                AI Enhance
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  const corrected = project.script?.replace(/\bi\b/g, "I").replace(/\.\s+/g, ". ");
                  if (corrected) {
                    onProjectUpdate({ script: corrected });
                    setCharacterCount(corrected.length);
                  }
                }}
              >
                <CheckSquare className="h-3 w-3 mr-1" />
                Grammar Check
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  const suggestions = [
                    "Try adding emotional hooks at the beginning",
                    "Include specific numbers and statistics",
                    "End with a clear call to action",
                    "Use active voice for more engagement"
                  ];
                  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
                  alert(`Suggestion: ${randomSuggestion}`);
                }}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                Suggestions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Customization Options */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-brand-text mb-4">Customize Your Video</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration Selection */}
            <div>
              <Label className="text-sm font-medium text-brand-text mb-2 block">Duration</Label>
              <Select value={project.duration?.toString()} onValueChange={(value) => onProjectUpdate({ duration: parseInt(value) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="90">1.5 minutes</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                  <SelectItem value="180">3 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="600">10 minutes</SelectItem>
                  <SelectItem value="900">15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Style Selection */}
            <div>
              <Label className="text-sm font-medium text-brand-text mb-2 block">Video Style</Label>
              <Select value={project.style} onValueChange={(value) => onProjectUpdate({ style: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Aspect Ratio */}
            <div>
              <Label className="text-sm font-medium text-brand-text mb-2 block">Aspect Ratio</Label>
              <div className="flex space-x-2">
                <Button 
                  variant={project.aspectRatio === "16:9" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleAspectRatioSelect("16:9")}
                >
                  16:9
                </Button>
                <Button 
                  variant={project.aspectRatio === "9:16" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleAspectRatioSelect("9:16")}
                >
                  9:16
                </Button>
                <Button 
                  variant={project.aspectRatio === "1:1" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleAspectRatioSelect("1:1")}
                >
                  1:1
                </Button>
              </div>
            </div>
            
            {/* Voice Options */}
            <div>
              <Label className="text-sm font-medium text-brand-text mb-2 block">Voiceover</Label>
              <Select value={project.voiceOver} onValueChange={(value) => onProjectUpdate({ voiceOver: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Voice</SelectItem>
                  <SelectItem value="ai_female">AI Female Voice</SelectItem>
                  <SelectItem value="ai_male">AI Male Voice</SelectItem>
                  <SelectItem value="clone">Voice Clone</SelectItem>
                  <SelectItem value="upload">Upload Audio</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Voice Clone Interface */}
              {project.voiceOver === "clone" && (
                <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                  <Label className="text-sm font-medium text-brand-text mb-2 block">Upload Voice Sample</Label>
                  <p className="text-xs text-gray-600 mb-3">Upload a 30-60 second audio clip to clone this voice</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input 
                        type="file" 
                        accept="audio/*" 
                        className="flex-1"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            alert(`Voice file selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          alert('Voice cloning will be processed. This feature requires an AI voice service to be configured.');
                        }}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-500">or</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => {
                        alert('Voice recording feature will be available soon. Please upload an audio file for now.');
                      }}
                    >
                      <Mic className="h-3 w-3 mr-2" />
                      Record Sample
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
