/**
 * Local Knowledge Base System
 * Indexes and searches through portfolio content without external API calls
 */

export interface KnowledgeItem {
  id: string;
  type: 'project' | 'blog' | 'research' | 'skill' | 'contact' | 'about' | 'experience';
  title: string;
  content: string;
  keywords: string[];
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface SearchResult {
  item: KnowledgeItem;
  score: number;
}

class KnowledgeBase {
  private items: KnowledgeItem[] = [];

  constructor() {
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase() {
    // Core About Information
    this.addItem({
      id: 'about-aime',
      type: 'about',
      title: 'About Aime Serge',
      content: `Aime Serge UKOBIZABA is a Senior Software Engineer specializing in Cybersecurity, Cloud Engineering, and AI Architectures. ALX Software Engineering Alumni with a BSc in Computer Science from the University of Rwanda. Google Cloud Certified with 22+ badges including Vertex AI, MLOps, and Model Armor.`,
      keywords: ['about', 'aime', 'serge', 'engineer', 'background', 'biography', 'who'],
      tags: ['biography', 'profile'],
    });

    // Contact Information
    this.addItem({
      id: 'contact-info',
      type: 'contact',
      title: 'Contact Information',
      content: `Email: aimeserge51260@gmail.com | WhatsApp: +250 792 957 513 | LinkedIn: /in/aimeserge. Always open to discussing interesting projects and collaborations.`,
      keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'whatsapp', 'linkedin'],
      tags: ['contact', 'communication'],
    });

    // Skills & Expertise
    this.addItem({
      id: 'tech-skills',
      type: 'skill',
      title: 'Technical Skills',
      content: `Backend: Node.js, Python (Django/DRF), Go, TypeScript, PostgreSQL, Redis. Cloud: Google Cloud Platform (GCP) - expert, AWS, Vercel. 
      AI/ML: RAG pipelines, LLM prompt design, Vertex AI, Semantic search. 
      Security: Zero-Trust Architecture, IAM, API Hardening, OWASP Top 10 mitigation, Penetration testing. 
      DevOps: Docker, Kubernetes, CI/CD pipelines, Infrastructure-as-code. 
      Tools: Linux/Ubuntu specialist, Git, Terraform, GitHub Actions.`,
      keywords: ['skills', 'technologies', 'tech', 'expertise', 'stack', 'tools', 'programming', 'languages', 'frameworks'],
      tags: ['skills', 'technical', 'expertise'],
    });

    // Project Categories
    this.addItem({
      id: 'projects-overview',
      type: 'project',
      title: 'Projects & Case Studies',
      content: `Aime Serge has worked on several production-scale projects: 
      1. Kigali Transport (Flex) - IoT & AI solution for urban mobility using real-time GCP data processing in Rwanda. 
      2. AI-Powered E-commerce Platform - High-scale commerce platform using Vertex AI for semantic search and personalized discovery. 
      3. Secure API System - Hardened backend scaffold with JWT/RBAC and Zod validation for production startups. 
      4. ALX Project Nexus - Monorepo aggregator for course projects with build orchestration. 
      5. ONLINESTORE E-commerce - Full-stack e-commerce platform with cart, checkout and mock APIs.`,
      keywords: ['project', 'projects', 'work', 'portfolio', 'case study', 'built', 'created', 'developed'],
      tags: ['projects', 'portfolio'],
      metadata: {
        projectCount: 5,
        categories: ['IoT', 'AI/ML', 'E-commerce', 'Infrastructure', 'Cybersecurity'],
      },
    });

    // Security Expertise
    this.addItem({
      id: 'security-expertise',
      type: 'experience',
      title: 'Cybersecurity Specialization',
      content: `Expertise in implementing Zero-Trust Architecture, Identity & Access Management (IAM), API security hardening, and comprehensive OWASP Top 10 vulnerability mitigation. 
      Conducted penetration testing and security audits on multiple production systems. Proficient in encryption protocols, secure authentication mechanisms, 
      secure coding practices, and compliance frameworks (SOC 2, ISO 27001). Experience with security headers implementation, rate limiting, 
      input validation, and SQL injection prevention. Cloud security includes: secure API gateway configuration, VPC security, IAM policies, 
      secrets management, encryption at rest and in transit, DDoS protection, and security monitoring.`,
      keywords: ['security', 'cybersecurity', 'protect', 'secure', 'encryption', 'authentication', 'zero-trust', 'pentest', 'vulnerability', 'cloud security', 'handle', 'defense', 'attack', 'breach', 'compliance', 'audit'],
      tags: ['security', 'expertise', 'cloud-security'],
    });

    // Cloud Expertise
    this.addItem({
      id: 'cloud-expertise',
      type: 'experience',
      title: 'Cloud Engineering & GCP Specialization',
      content: `Deep expertise in Google Cloud Platform (GCP) with 22+ certifications including Vertex AI, MLOps, and Model Armor. 
      Experienced with AWS services, Vercel edge functions, and serverless architectures. Proficient in infrastructure-as-code using Terraform, 
      containerization with Docker and Kubernetes, and implementing CI/CD pipelines. Skilled in cloud database design, 
      microservices architecture, and multi-region deployments.`,
      keywords: ['cloud', 'gcp', 'google cloud', 'aws', 'vercel', 'serverless', 'infrastructure', 'devops', 'deployment'],
      tags: ['cloud', 'infrastructure'],
    });

    // Cloud Security Specific
    this.addItem({
      id: 'cloud-security-practices',
      type: 'experience',
      title: 'How Do You Handle Cloud Security?',
      content: `I handle cloud security through multiple layers: 1) Identity & Access Management (IAM) - Implement least privilege principles, role-based access control, and service account security. 2) Network Security - Configure secure VPCs, firewall rules, and API gateway authentication. 3) Data Protection - Enable encryption at rest (Cloud KMS), encryption in transit (TLS/mTLS), and secrets management. 4) Compliance - Implement SOC 2, ISO 27001 compliance, audit logging, and data residency requirements. 5) Continuous Monitoring - Use Cloud Monitoring, Security Command Center, and real-time alerts for threats. 6) Incident Response - Have automated responses, detailed logging, and incident playbooks ready. 7) Container Security - Scan images for vulnerabilities, implement Pod Security Policies, and network policies. 8) API Security - Rate limiting, request validation, DDoS protection, and API key rotation. I recommend the Zero-Trust Architecture model: verify every access, encrypt everything, and assume breach.`,
      keywords: ['cloud security', 'handle', 'secure cloud', 'cloud safety', 'protect cloud', 'security practices', 'how do', 'implementation', 'strategy', 'defense'],
      tags: ['security', 'cloud', 'practices'],
    });

    // AI & ML Experience
    this.addItem({
      id: 'ai-ml-expertise',
      type: 'experience',
      title: 'AI & Machine Learning',
      content: `Specialized in building RAG (Retrieval Augmented Generation) pipelines for domain-specific AI applications. 
      Expertise in LLM prompt engineering, fine-tuning models for specific use cases, and implementing semantic search engines. 
      Experience with Google Vertex AI platform, including model training, deployment, and monitoring. 
      Proficient in vector databases, embedding systems, and building production-grade AI features. 
      Focused on responsible AI, model governance, and preventing AI-related security risks.`,
      keywords: ['ai', 'machine learning', 'ml', 'rag', 'llm', 'vertex', 'semantic search', 'embeddings', 'neural', 'deep learning'],
      tags: ['ai', 'ml', 'expertise'],
    });

    // Experience Methodology
    this.addItem({
      id: 'experience-approach',
      type: 'experience',
      title: 'Approach & Methodology',
      content: `Aime uses the STAR (Situation, Task, Action, Result) methodology when explaining project experiences. 
      Situation: Identifies the challenge or context. Task: Defines the specific objective. 
      Action: Describes the actionable steps taken. Result: Quantifies the measurable outcomes. 
      This ensures clear communication of technical achievements and demonstrates problem-solving ability with concrete examples.`,
      keywords: ['experience', 'methodology', 'approach', 'star', 'how', 'method', 'process'],
      tags: ['experience', 'methodology'],
    });
  }

  addItem(item: KnowledgeItem) {
    this.items.push(item);
  }

  /**
   * Search knowledge base using keyword matching and scoring
   */
  search(query: string, limit: number = 5): SearchResult[] {
    if (!query.trim()) return [];

    const queryWords = query.toLowerCase().split(/\s+/);
    const results: SearchResult[] = [];

    console.log('🔎 Searching KB with query words:', queryWords);

    this.items.forEach((item) => {
      let score = 0;
      const contentLower = item.content.toLowerCase();
      const titleLower = item.title.toLowerCase();

      // Exact title match (highest priority)
      if (titleLower === query.toLowerCase()) {
        score += 100;
      }

      // Title contains any query word (very high priority)
      queryWords.forEach((word) => {
        if (titleLower.includes(word)) {
          score += 10;
        }
      });

      // Keywords exact match (high priority)
      item.keywords.forEach((keyword) => {
        queryWords.forEach((word) => {
          if (keyword.toLowerCase() === word) {
            score += 8;
          } else if (keyword.toLowerCase().includes(word)) {
            score += 5;
          }
        });
      });

      // Tags matching (medium priority)
      if (item.tags) {
        item.tags.forEach((tag) => {
          queryWords.forEach((word) => {
            if (tag.toLowerCase().includes(word)) {
              score += 3;
            }
          });
        });
      }

      // Content matching (lower priority but important)
      queryWords.forEach((word) => {
        if (word.length > 2) {
          // Count occurrences in content
          const regex = new RegExp(`\\b${word}\\b`, 'gi');
          const matches = contentLower.match(regex) || [];
          score += matches.length * 2;
        }
      });

      console.log(`  📊 Item "${item.title}": score ${score}`);

      if (score > 0) {
        results.push({ item, score });
      }
    });

    // Sort by score descending and return top results
    const sorted = results.sort((a, b) => b.score - a.score).slice(0, limit);
    console.log('✅ Found', sorted.length, 'results');
    return sorted;
  }

  /**
   * Get item by type
   */
  getByType(type: KnowledgeItem['type']): KnowledgeItem[] {
    return this.items.filter((item) => item.type === type);
  }

  /**
   * Get all items
   */
  getAllItems(): KnowledgeItem[] {
    return this.items;
  }

  /**
   * Generate a context-aware response from search results
   */
  generateResponse(query: string, searchResults: SearchResult[]): string {
    if (searchResults.length === 0) {
      return `I don't have specific information about "${query}" in my knowledge base. However, I'm happy to discuss my expertise in Cloud Engineering, Cybersecurity, and AI Architectures. Feel free to ask about my projects, skills, or how to get in touch at aimeserge51260@gmail.com.`;
    }

    const allResults = searchResults.map((r) => r.item.content).join('\n\n');

    return `Based on your question about "${query}":\n\n${allResults}`;
  }
}

// Export singleton instance
export const knowledgeBase = new KnowledgeBase();
