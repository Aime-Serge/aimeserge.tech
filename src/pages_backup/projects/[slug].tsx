import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";
import Link from "next/link";

export default function CaseStudyDetailPage() {
  const { query } = useRouter();
  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug;
  const caseStudy = useAppSelector((s: RootState) => s.caseStudies.items.find(c => c.slug === slug));

  if (!caseStudy) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Not found</h1>
        <p className="text-gray-600">Project not found.</p>
        <Link href="/projects"><a className="text-blue-600">← Back</a></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{caseStudy.title}</h1>
      <p className="text-gray-600 mb-4">{caseStudy.tagline}</p>

      <div className="mb-6 text-sm text-gray-500">
        <div><strong>Role:</strong> {caseStudy.role}</div>
        <div><strong>Date:</strong> {new Date(caseStudy.createdAt).toLocaleDateString()}</div>
        {caseStudy.url && <div><strong>Live:</strong> <a href={caseStudy.url} target="_blank" rel="noreferrer" className="text-blue-600">{caseStudy.url}</a></div>}
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-700">{caseStudy.summary}</p>
      </section>

      {caseStudy.pdfUrl && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Case Study PDF</h2>
          <iframe src={caseStudy.pdfUrl} className="w-full h-[620px] border" />
          <div className="mt-3">
            <a href={caseStudy.pdfUrl} download className="px-3 py-2 bg-green-600 text-white rounded">Download PDF</a>
          </div>
        </section>
      )}
    </div>
  );
}
