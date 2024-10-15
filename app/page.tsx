import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import ButtonCard from "./components/buttonCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="mb-16 text-4xl text-white">홈 페이지</h1>

      <div className="flex items-center justify-center gap-8">
      {/* 하나는 번역페이지, 하나는 gcs로 이미지 저장하는 페이지  */}
      <Link className="m-4" href="/translate">
        <ButtonCard text={"번역 페이지"}></ButtonCard>
      </Link>

      <Link href="/gcs-image">
        <ButtonCard text={"이미지 저장 페이지"}></ButtonCard>
      </Link>
    </div>
   </div>
  )
}
