import { FileSizeOptions, filesize as fs } from "filesize";

export function filesize(byteCount: number, opts?: FileSizeOptions) {
  const options = {
    pad: true,
    precision: 2,
    ...opts,
  };

  return fs(byteCount, options).toString();
}
