"use client";

import { useCallback, useState } from "react";

export default function StoragePage() {
  const [images, setImages] = useState<File[]>([]);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
  
    if (files.length > 0) {
      const file = files[0]; // 첫 번째 파일 선택
      console.log("Dropped file:", file); // 파일 정보 로그 추가
      if (!images.some(img => img.name === file.name && img.size === file.size)) {
        setImages(prevImages => [...prevImages, file]);
        await uploadToGCS(file);
      } else {
        console.warn('이미지가 이미 추가되었습니다:', file.name);
      }
    } else {
      console.warn('드롭된 파일이 없습니다.');
    }
  }, [images]);
  

  const uploadToGCS = async (file: File) => {
    if (!file) return;
  
    const filename = encodeURIComponent(file.name);
    console.log(`Uploading file: ${filename}`);
  
    const res = await fetch(`/api/upload?file=${filename}`, {
      method: 'POST',
    });
  
    if (!res.ok) {
      console.error('Error fetching signed URL:', res.status, await res.text());
      return;
    }
  
    const { url, fields } = await res.json();
    console.log('Received signed URL and fields:', url, fields);
  
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as Blob | string);
    });
  
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  
    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      const errorDetails = await upload.text();
      console.error('Upload failed:', upload.status, upload.statusText, errorDetails);
    }
  };
  

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">이미지를 드래그 앤 드롭으로 올려주세요</h1>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex items-center justify-center w-full h-64 transition duration-200 ease-in-out border-2 border-gray-400 border-dashed rounded-md bg-light-gray hover:bg-gray-200"
      >
        <p>이미지를 여기에 드래그 하세요</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index} className="p-2 border rounded">
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              className="object-cover w-full h-auto"
            />
            <p className="mt-2 text-sm">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
