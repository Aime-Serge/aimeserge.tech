import Link from 'next/link';
import { Blog } from '@/types/blog';

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
      <p className="text-xs text-gray-400 mb-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
      <Link href={`/blogs/${blog.id}`} className="text-blue-600 text-sm underline">
        Read more →
      </Link>
    </div>
  );
}
