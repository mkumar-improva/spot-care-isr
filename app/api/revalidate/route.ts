import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = await req.json().catch(() => ({}));
  const provided = (body && body.secret) || req.nextUrl.searchParams.get('secret');

  if (!secret || !provided || provided !== secret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const tagsParam = (body && body.tags) || req.nextUrl.searchParams.get('tags');
  const tags = Array.isArray(tagsParam)
    ? tagsParam
    : typeof tagsParam === 'string'
    ? tagsParam.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  if (tags.length === 0) {
    return NextResponse.json({ message: 'No tags provided' }, { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, tags });
}

