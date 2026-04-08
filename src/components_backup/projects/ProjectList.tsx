import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {projects.map((proj) => (
        <ProjectCard key={proj.id} project={proj} />
      ))}
    </div>
  );
}
