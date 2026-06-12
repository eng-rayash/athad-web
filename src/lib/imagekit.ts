export const IK_CONFIG = {
  urlEndpoint: "https://ik.imagekit.io/tilal/athaad",
  publicKey: "public_+k3lyndt9cYs7b5fumiMgiYG1C0=",
  privateKey: "private_xLHysFd/hc7OcPux21+Vr89eQNo=",
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

/** Upload a file to ImageKit using private key (admin only) */
export async function uploadToImageKit(
  file: File,
  fileName: string,
  folder = "projects"
): Promise<{ url: string; fileId: string; name: string }> {
  const credentials = btoa(`${IK_CONFIG.privateKey}:`);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("folder", folder);

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ImageKit upload failed: ${err}`);
  }

  const data = await res.json();
  return { url: data.url, fileId: data.fileId, name: data.name };
}

/** Upload a local asset URL (Vite bundled) to ImageKit */
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
