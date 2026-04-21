import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export function getUploadsRootDir() {
  return process.env.UPLOADS_DIR || path.join(/* turbopackIgnore: true */ process.cwd(), "public", "uploads");
}

export function resolveUploadPath(segments: string[]) {
  const rootDir = path.resolve(getUploadsRootDir());
  const filePath = path.resolve(rootDir, ...segments);
  const relativePath = path.relative(rootDir, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return filePath;
}

function sanitizeFileName(fileName: string) {
  const cleaned = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  return cleaned || "file";
}

export function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseStringArrayValue(value: string): string[] {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "[]") {
    return [];
  }

  if (
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.flatMap((item) => (typeof item === "string" ? parseStringArrayValue(item) : []));
      }

      if (typeof parsed === "string") {
        return parseStringArrayValue(parsed);
      }
    } catch {
      // Fall back to the raw trimmed value when the string is not valid JSON.
    }
  }

  return [trimmed];
}

export function getStringArray(formData: FormData, key: string) {
  const values = formData.getAll(key);

  return values
    .filter((value): value is string => typeof value === "string")
    .flatMap(parseStringArrayValue);
}

function normalizeUploadUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "[]") {
    return null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      return new URL(trimmed).toString();
    } catch {
      return null;
    }
  }

  return null;
}

export function normalizeUploadUrls(values: string[]) {
  return Array.from(
    new Set(
      values
        .flatMap(parseStringArrayValue)
        .map(normalizeUploadUrl)
        .filter((value): value is string => Boolean(value))
    )
  );
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

  const targetDir = path.join(getUploadsRootDir(), folder);
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
