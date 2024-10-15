import { Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Received POST request for upload');

  // 환경 변수에서 인증 정보 가져오기
  const credentials = {
    project_id: process.env.GCP_PROJECT_ID,
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'), // private_key의 줄바꿈 처리
  };

  const storage = new Storage({
    projectId: credentials.project_id,
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
  });

  const bucket = storage.bucket(process.env.BUCKET_NAME!);
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ error: 'File name is required' }, { status: 400 });
  }

  const file = bucket.file(fileName);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, // 1 minute
    fields: { 'x-goog-meta-test': 'data' },
  };

  try {
    const [response] = await file.generateSignedPostPolicyV4(options);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating signed URL', error);
    return NextResponse.json({ error: 'Error generating signed URL' }, { status: 500 });
  }
}
