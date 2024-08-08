import { bucket } from "@/app/common/bucket";
import { kebabCase } from "lodash-es";

// GET /file/xxx
export async function GET(
  request: Request,
  { params }: { params: { key: string } },
) {
  const fileObject = await bucket.get(params.key);

  if (fileObject === null) {
    return new Response("Object Not Found", { status: 404 });
  }

  const headers = new Headers();

  // this is not work in dev.
  // https://github.com/cloudflare/workers-sdk/issues/6047
  if (process.env.NODE_ENV === "production") {
    fileObject.writeHttpMetadata(headers);
  } else {
    // compatible with local dev.
    if (fileObject.httpMetadata) {
      Object.keys(fileObject.httpMetadata!).forEach((key) => {
        const headerKey = key as keyof R2HTTPMetadata;
        const headerValue = fileObject.httpMetadata![headerKey]?.toString();

        if (headerValue) {
          headers.set(kebabCase(headerKey), headerValue);
        }
      });
    }
  }

  headers.set("etag", fileObject.httpEtag);

  return new Response(fileObject.body, { headers });
}
