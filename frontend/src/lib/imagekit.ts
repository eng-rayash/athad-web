export const IK_CONFIG = {
  urlEndpoint: "https://ik.imagekit.io/tilal/athaad",
  publicKey: "public_+k3lyndt9cYs7b5fumiMgiYG1C0=",
};

/** Build an ImageKit URL with optional transformations */
export function ikUrl(path: string, opts?: { w?: number; h?: number; q?: number }) {
  const base = `${IK_CONFIG.urlEndpoint}/${path.replace(/^\//, "")}`;
  if (!opts) return base;
  const parts: string[] = [];
  if (opts.w) parts.push(`w-${opts.w}`);
  if (opts.h) parts.push(`h-${opts.h}`);
  if (opts.q) parts.push(`q-${opts.q}`);
  return parts.length ? `${base}?tr=${parts.join(",")}` : base;
}

/** Upload a file to ImageKit via backend API (admin only) */
export async function uploadToImageKit(
  file: File,
  fileName: string,
  folder = "projects"
): Promise<{ url: string; fileId: string; name: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed: ${err}`);
  }

  return res.json();
}

/** Upload a local asset URL to ImageKit via backend */
export async function migrateLocalImage(
  localUrl: string,
  fileName: string,
  folder = "projects"
): Promise<{ url: string; fileId: string; name: string }> {
  const res = await fetch(localUrl);
  const blob = await res.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return uploadToImageKit(file, fileName, folder);
}
