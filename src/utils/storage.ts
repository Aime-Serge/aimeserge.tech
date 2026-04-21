/**
 * Finalized Supabase Storage Utility for KZYQIADZETZPRWETYEBM Node
 * Provides cloud-native asset resolution with intelligent fallbacks.
 */

const SUPABASE_URL = "https://kzyqiadzetzprwetyebm.supabase.co";
const BUCKET_NAME = "artifacts";

export function getAssetUrl(path: string | null | undefined): string {
  if (!path) return "";
  
  // If it's already a full URL, return it
  if (path.startsWith("http")) return path;

  // Constructs the live Supabase Storage Public URL
  // Expected input path format: 'projects/nexus-arch.png'
  // Or: 'research/paper.pdf'
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path.replace(/^\//, '')}`;
}
