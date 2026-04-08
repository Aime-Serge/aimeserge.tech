"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Check password strength
  function checkStrength(pw: string) {
    if (!pw) return "";
    if (pw.length < 6) return "Weak";
    if (pw.match(/[A-Z]/) && pw.match(/[0-9]/) && pw.match(/[^a-zA-Z0-9]/)) {
      return "Strong";
    }
    return "Medium";
  }

  // 🔹 Handle typing
  function handlePasswordChange(value: string) {
    setPassword(value);
    setStrength(checkStrength(value));
  }

  // 🔹 Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ crucial for cookie auth
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect or update UI
        window.location.href = "/admin";
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Admin Login
        </h1>

        {/* Password Field */}
        <div className="relative mb-3">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {strength && (
          <p
            className={`text-sm mb-2 ${
              strength === "Weak"
                ? "text-red-500"
                : strength === "Medium"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            Strength: {strength}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
