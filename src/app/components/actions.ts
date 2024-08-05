"use server";

import { FileItem } from "@/typings/file";
import { CfR2Bucket } from "@/utils/cf-r2-bucket";

type LsData = {
  files: Record<string, FileItem>;
};

export async function getLsData(): Promise<LsData> {
  const bucket = new CfR2Bucket("MY_BUCKET");

  const lsObject = await bucket.get("ls.json");

  let lsData = { files: {} };

  if (lsObject) {
    lsData = await lsObject.json();
  }

  return lsData;
}

export async function setLsData(lsData: LsData) {
  const bucket = new CfR2Bucket("MY_BUCKET");
  await bucket.put("ls.json", JSON.stringify(lsData));
}

export async function upload(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("invalid submit data");
  }

  const lsData = await getLsData();

  lsData.files[file.name] = {
    name: file.name,
    uploadAt: Date.now(),
    size: file.size,
  };

  const bucket = new CfR2Bucket("MY_BUCKET");
  await bucket.put(file.name, file);

  await setLsData(lsData);
}

export async function remove(key: string) {
  const lsData = await getLsData();
  delete lsData.files[key];

  await setLsData(lsData);

  const bucket = new CfR2Bucket("MY_BUCKET");
  await bucket.delete(key);
}
