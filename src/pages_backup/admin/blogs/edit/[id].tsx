import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { editBlog } from "@/store/slices/blogsSlice";

export default function EditBlogPage() {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const dispatch = useAppDispatch();
  const blog = useAppSelector((s: RootState) => s.blogs.items.find(b => b.id === id));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  if (!blog) return <AdminLayout><div className="p-6">Blog not found.</div></AdminLayout>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!blog) return;
    dispatch(editBlog({ ...blog, id: blog.id!, title, content, createdAt: blog.createdAt }));
    window.location.href = "/admin/blogs";
  }
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
          <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border rounded" rows={10} />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button type="button" onClick={() => history.back()} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
