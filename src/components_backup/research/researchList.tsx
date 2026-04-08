import { Research } from '@/types/research';
import ResearchCard from './ResearchCard';

export default function ResearchList({ researchList }: { researchList: Research[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {researchList.map((res) => (
        <ResearchCard key={res.id} research={res} />
      ))}
    </div>
  );
}
