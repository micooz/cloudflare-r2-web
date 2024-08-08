import { getRequestContext } from "@cloudflare/next-on-pages";

export class CfR2Bucket {
  constructor(private bindingKey: keyof CloudflareEnv) {}

  async list(opts?: R2ListOptions) {
    return this.bucket.list(opts);
  }

  async get(key: string) {
    return this.bucket.get(key);
  }

  async put(
    key: string,
    value:
      | ReadableStream
      | ArrayBuffer
      | ArrayBufferView
      | string
      | null
      | Blob,
    opts?: R2PutOptions,
  ) {
    return this.bucket.put(key, value, opts);
  }

  async delete(key: string) {
    return this.bucket.delete(key);
  }

  private get bucket() {
    const { env } = getRequestContext();

    return env[this.bindingKey] as unknown as R2Bucket;
  }
}
