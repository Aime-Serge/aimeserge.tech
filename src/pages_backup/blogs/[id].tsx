import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";

export default function BlogDetailPage() {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const blog = useAppSelector((s: RootState) => s.blogs.items.find(b => b.id === id));

  if (!blog) return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="text-gray-600">Blog post not found.</p>
      <Link href="/blogs"><a className="text-blue-600">← Back</a></Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <div className="text-xs text-gray-500 mb-6">{new Date(blog.createdAt).toLocaleDateString()}</div>
      <article className="prose max-w-none">
        <p>{blog.content}</p>
      </article>
      <div className="mt-6">
        <Link href="/blogs" className="text-blue-600">← Back to blog list</Link>
      </div>
    </div>
  );
}
