import { FileSizeOptions, filesize as fs } from "filesize";

export function filesize(byteCount: number, opts?: FileSizeOptions) {
  const options: FileSizeOptions = {
    pad: true,
    ...opts,
  };

  return fs(byteCount, options).toString();
}
