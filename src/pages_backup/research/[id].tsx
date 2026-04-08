import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";

export default function ResearchDetailPage() {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const item = useAppSelector((s: RootState) => s.research.items.find(r => r.id === id));

  if (!item) return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="text-gray-600">Research item not found.</p>
      <Link href="/research"><a className="text-blue-600">← Back</a></Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-3">{item.title}</h1>
      <div className="text-xs text-gray-500 mb-6">{new Date(item.createdAt).toLocaleDateString()}</div>
      <section className="text-gray-700">
        <p>{item.abstract}</p>
      </section>

      {item.pdfUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">PDF</h3>
          <iframe src={item.pdfUrl} className="w-full h-[520px] border" />
          <div className="mt-2">
            <a href={item.pdfUrl} download className="px-3 py-2 bg-green-600 text-white rounded">Download PDF</a>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href="/research" className="text-blue-600">← Back to research list</Link>
      </div>
    </div>
  );
}
