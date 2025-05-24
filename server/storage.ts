import { users, videoProjects, templates, type User, type InsertUser, type VideoProject, type InsertVideoProject, type UpdateVideoProject, type Template, type InsertTemplate } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Video project methods
  getVideoProject(id: number): Promise<VideoProject | undefined>;
  getVideoProjectsByUser(userId?: number): Promise<VideoProject[]>;
  createVideoProject(project: InsertVideoProject): Promise<VideoProject>;
  updateVideoProject(id: number, updates: UpdateVideoProject): Promise<VideoProject | undefined>;
  deleteVideoProject(id: number): Promise<boolean>;

  // Template methods
  getTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videoProjects: Map<number, VideoProject>;
  private templates: Map<number, Template>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentTemplateId: number;

  constructor() {
    this.users = new Map();
    this.videoProjects = new Map();
    this.templates = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentTemplateId = 1;

    // Initialize with default templates
    this.initializeTemplates();
  }

  private initializeTemplates() {
    const defaultTemplates: InsertTemplate[] = [
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

    defaultTemplates.forEach(template => {
      const id = this.currentTemplateId++;
      const templateWithId: Template = { ...template, id };
      this.templates.set(id, templateWithId);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Video project methods
  async getVideoProject(id: number): Promise<VideoProject | undefined> {
    return this.videoProjects.get(id);
  }

  async getVideoProjectsByUser(userId?: number): Promise<VideoProject[]> {
    const projects = Array.from(this.videoProjects.values());
    if (userId) {
      return projects.filter(project => project.userId === userId);
    }
    return projects.sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async createVideoProject(insertProject: InsertVideoProject): Promise<VideoProject> {
    const id = this.currentProjectId++;
    const now = new Date();
    const project: VideoProject = { 
      ...insertProject, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.videoProjects.set(id, project);
    return project;
  }

  async updateVideoProject(id: number, updates: UpdateVideoProject): Promise<VideoProject | undefined> {
    const existing = this.videoProjects.get(id);
    if (!existing) return undefined;

    const updated: VideoProject = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    this.videoProjects.set(id, updated);
    return updated;
  }

  async deleteVideoProject(id: number): Promise<boolean> {
    return this.videoProjects.delete(id);
  }

  // Template methods
  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(t => t.isActive === 1);
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const template: Template = { ...insertTemplate, id };
    this.templates.set(id, template);
    return template;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getVideoProject(id: number): Promise<VideoProject | undefined> {
    const [project] = await db.select().from(videoProjects).where(eq(videoProjects.id, id));
    return project || undefined;
  }

  async getVideoProjectsByUser(userId?: number): Promise<VideoProject[]> {
    if (userId) {
      return await db.select().from(videoProjects).where(eq(videoProjects.userId, userId));
    }
    return await db.select().from(videoProjects);
  }

  async createVideoProject(insertProject: InsertVideoProject): Promise<VideoProject> {
    const [project] = await db
      .insert(videoProjects)
      .values({
        ...insertProject,
        duration: insertProject.duration || 30,
        style: insertProject.style || 'modern',
        aspectRatio: insertProject.aspectRatio || '16:9',
        voiceOver: insertProject.voiceOver || 'ai_female',
        template: insertProject.template || 'business',
        status: insertProject.status || 'draft'
      })
      .returning();
    return project;
  }

  async updateVideoProject(id: number, updates: UpdateVideoProject): Promise<VideoProject | undefined> {
    const [project] = await db
      .update(videoProjects)
      .set(updates)
      .where(eq(videoProjects.id, id))
      .returning();
    return project || undefined;
  }

  async deleteVideoProject(id: number): Promise<boolean> {
    const result = await db.delete(videoProjects).where(eq(videoProjects.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getTemplates(): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.isActive, 1));
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template || undefined;
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const [template] = await db
      .insert(templates)
      .values(insertTemplate)
      .returning();
    return template;
  }
}

export const storage = new DatabaseStorage();
