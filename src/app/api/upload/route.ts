import { upload } from "@/app/actions";
import { checkAuth } from "@/utils/auth";

// POST /api/upload
export async function POST(request: Request) {
  await checkAuth();

  const formData = await request.formData();
  await upload(formData);

  return new Response(null, { status: 200 });
}
