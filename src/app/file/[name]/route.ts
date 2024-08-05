import { CfR2Bucket } from "@/utils/cf-r2-bucket";

// GET /file/xxx
export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const fileName = params.name;

  const bucket = new CfR2Bucket("MY_BUCKET");
  const fileObject = await bucket.get(fileName);

  if (fileObject === null) {
    return new Response("Object Not Found", { status: 404 });
  }

  const headers = new Headers();

  // this is not work in dev.
  // https://github.com/cloudflare/workers-sdk/issues/6047
  if (process.env.NODE_ENV === "production") {
    fileObject.writeHttpMetadata(headers);
  }

  headers.set("etag", fileObject.httpEtag);

  return new Response(fileObject.body, { headers });
}
