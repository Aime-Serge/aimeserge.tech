import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <p className="mb-6 text-gray-600">
          Welcome to your admin control panel. Choose a section below to manage
          content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Blogs Section */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3">Blogs</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/blogs" className="text-blue-600 hover:underline">
                  Manage Blogs
                </Link>
              </li>
              <li>
                <Link href="/admin/blogs/new" className="text-blue-600 hover:underline">
                  Add Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Case Studies Section */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3">Case Studies</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/case-studies" className="text-blue-600 hover:underline">
                  Manage Case Studies
                </Link>
              </li>
              <li>
                <Link href="/admin/case-studies/new" className="text-blue-600 hover:underline">
                  Add Case Study
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects Section */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3">Projects</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/projects" className="text-blue-600 hover:underline">
                  Manage Projects
                </Link>
              </li>
              <li>
                <Link href="/admin/projects/new" className="text-blue-600 hover:underline">
                  Add Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Research Section */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3">Research</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/research" className="text-blue-600 hover:underline">
                  Manage Research
                </Link>
              </li>
              <li>
                <Link href="/admin/research/new" className="text-blue-600 hover:underline">
                  Add Research
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
