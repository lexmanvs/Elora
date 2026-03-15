import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params;
    
    // We strictly read from the /tmp directory which is the only 
    // writable location on Vercel's Serverless ephemeral filesystem
    const filepath = join('/tmp/uploads/products', filename);
    const file = await readFile(filepath);
    
    let contentType = "image/jpeg";
    if (filename.toLowerCase().endsWith(".png")) contentType = "image/png";
    else if (filename.toLowerCase().endsWith(".webp")) contentType = "image/webp";
    else if (filename.toLowerCase().endsWith(".gif")) contentType = "image/gif";
    
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable" // Cache aggressively to save edge bandwidth
      }
    });
  } catch (error) {
    console.error("API Image Route Error:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
