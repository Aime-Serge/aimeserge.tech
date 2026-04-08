import { Blog } from '@/types/blog';
import BlogCard from './BlogCard';

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {blogs.map((b) => (
        <BlogCard key={b.id} blog={b} />
      ))}
    </div>
  );
}
