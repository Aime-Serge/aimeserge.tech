"use server";

import { vectorStore } from "@/core/ai/vector-store";
import { type Project } from "@/modules/portfolio/actions";

/**
 * Syncs a project artifact to the AI Knowledge Base (pgvector)
 */
export async function syncProjectToKnowledge(project: Project) {
  try {
    const contentToEmbed = `
Project Title: ${project.title}
Tagline: ${project.tagline}
Role: ${project.role}
Summary: ${project.summary}
Details: ${project.description}
Tools used: ${project.tools.join(', ')}
Key Features: ${project.features.join(', ')}
Category: ${project.category}
    `.trim();

    await vectorStore.upsert(project.id, contentToEmbed, {
      type: 'project',
      slug: project.slug,
      title: project.title
    });

    return { success: true };
  } catch (error) {
    console.error("Project Sync Error:", error);
    return { success: false, error };
  }
}
