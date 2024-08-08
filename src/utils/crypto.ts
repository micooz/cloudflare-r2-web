export async function hashFile(file: File, algorithm = "SHA-256") {
  const buffer = await file.arrayBuffer();

  const myDigest = await crypto.subtle.digest(
    {
      name: algorithm,
    },
    buffer,
  );

  return uint8ArrayToHexString(new Uint8Array(myDigest));
}

export function uint8ArrayToHexString(uint8Array: Uint8Array) {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
