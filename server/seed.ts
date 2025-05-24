import { db } from "./db";
import { templates } from "@shared/schema";

const defaultTemplates = [
  {
    name: "Business",
    description: "Professional business presentation style",
    thumbnailUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "corporate",
    isActive: 1
  },
  {
    name: "Technology",
    description: "Modern tech-focused design",
    thumbnailUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "tech",
    isActive: 1
  },
  {
    name: "Creative",
    description: "Colorful and engaging creative style",
    thumbnailUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "creative",
    isActive: 1
  },
  {
    name: "Minimal",
    description: "Clean and minimalist design",
    thumbnailUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "minimal",
    isActive: 1
  },
  {
    name: "YouTube Intro",
    description: "Perfect for YouTube channel intros",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "youtube",
    isActive: 1
  },
  {
    name: "YouTube Tutorial",
    description: "Educational content for tutorials",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "youtube",
    isActive: 1
  },
  {
    name: "Social Media",
    description: "Optimized for social platforms",
    thumbnailUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "social",
    isActive: 1
  },
  {
    name: "Product Demo",
    description: "Showcase your products effectively",
    thumbnailUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "marketing",
    isActive: 1
  },
  {
    name: "Explainer",
    description: "Perfect for explaining concepts",
    thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "educational",
    isActive: 1
  },
  {
    name: "Artistic",
    description: "Creative artistic video style",
    thumbnailUrl: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "creative",
    isActive: 1
  },
  {
    name: "Gaming",
    description: "Dynamic gaming content style",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "gaming",
    isActive: 1
  },
  {
    name: "News Report",
    description: "Professional news presentation",
    thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    category: "news",
    isActive: 1
  }
];

async function seedDatabase() {
  try {
    console.log("Seeding database with templates...");
    
    // Insert templates
    await db.insert(templates).values(defaultTemplates).onConflictDoNothing();
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();