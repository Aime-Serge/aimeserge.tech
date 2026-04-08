import { Research } from '@/types/research';

export default function ResearchCard({ research }: { research: Research }) {
  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-1">{research.title}</h3>
      <p className="text-xs text-gray-400 mb-2">{new Date(research.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-600 mb-2">{research.abstract}</p>
      {research.pdfUrl && (
        <a
          href={research.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline"
        >
          View PDF →
        </a>
      )}
    </div>
  );
}
