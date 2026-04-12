import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function sanitizeFileName(fileName: string) {
  const cleaned = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  return cleaned || "file";
}

export function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function getStringArray(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  const parsed = JSON.parse(value) as unknown;

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function getFiles(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

export async function saveUploadedFiles(files: File[], folder: string) {
  if (!files.length) {
    return [];
  }

  const targetDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(targetDir, { recursive: true });

  return Promise.all(
    files.map(async (file) => {
      const ext = path.extname(file.name);
      const fileName = `${Date.now()}-${randomUUID()}${ext || `-${sanitizeFileName(file.name)}`}`;
      const targetPath = path.join(targetDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());

      await writeFile(targetPath, buffer);

      return `/uploads/${folder}/${fileName}`;
    })
  );
}
