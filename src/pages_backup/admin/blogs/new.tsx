import AdminLayout from "@/components/layout/AdminLayout";
import { exportJSON } from "@/utils/dataExport";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { deleteBlog } from "@/store/slices/blogsSlice";
import Link from "next/link";

export default function AdminBlogs() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: RootState) => s.blogs.items);

  function handleExport() {
    exportJSON("blogs.json", items);
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <button onClick={handleExport} className="px-3 py-2 bg-blue-600 text-white rounded">Export</button>
          <Link href="/admin/blogs/new" className="ml-auto text-blue-600">Add New Blog</Link>
        </div>

        <div className="space-y-3">
          {!items.length && <div className="p-4 bg-white rounded shadow">No blog posts yet.</div>}
          {items.map(b => (
            <div key={b.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-xs text-gray-500 line-clamp-2">{b.content}</div>
              </div>
              <div className="flex gap-3 items-center">
                <Link href={`/blogs/${b.id}`} className="text-sm text-blue-600">View</Link>
                <button className="text-red-600" onClick={() => { if (confirm("Delete blog post?")) dispatch(deleteBlog(b.id)); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
