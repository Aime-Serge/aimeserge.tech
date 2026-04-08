import { Project } from '@/types/project';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline"
        >
          View project →
        </a>
      )}
    </div>
  );
}
