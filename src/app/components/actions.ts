"use server";

import { bucket } from "../common/bucket";
import { FileItem } from "@/typings/file";
import { hashFile } from "@/utils/crypto";
import { sortBy } from "lodash-es";

export async function list() {
  const files = await bucket.list({
    include: ["customMetadata", "httpMetadata"],
  });

  const objects = files.objects.map(
    (item) =>
      ({
        key: item.key,
        name: item.customMetadata?.["name"] || item.key,
        uploaded: item.uploaded.getTime(),
        size: item.size,
      }) as FileItem,
  );

  return sortBy(objects, (item) => item.uploaded);
}

export async function upload(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("invalid submit data");
  }

  const sha256 = await hashFile(file, "SHA-256");

  await bucket.put(sha256, file, {
    sha256,
    httpMetadata: {
      contentType: file.type,
      contentDisposition: `attachment; filename=${encodeURIComponent(file.name)}`,
    },
    customMetadata: {
      name: file.name,
    },
  });
}

export async function remove(key: string) {
  await bucket.delete(key);
}
