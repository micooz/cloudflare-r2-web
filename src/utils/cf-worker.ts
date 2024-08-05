import { getRequestContext } from "@cloudflare/next-on-pages";

export class CfWorker {
  constructor(
    private bindingKey: keyof CloudflareEnv,
    private apiPrefix: string,
  ) {}

  async get(path: string) {
    "use server";
    return this.worker.fetch(`${this.apiPrefix}${path}`);
  }

  async getJSON<T>(path: string) {
    "use server";
    return this.get(path).then((res) => res.json<T>());
  }

  async post(path: string, body?: any) {
    "use server";
    return this.worker.fetch(`${this.apiPrefix}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body || {}),
    });
  }

  private get worker() {
    const { env } = getRequestContext();

    return env[this.bindingKey] as unknown as Fetcher;
  }
}
