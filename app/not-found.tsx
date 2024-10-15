import Link from "next/link";


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black">
            <p className="mb-8 text-white">잘못된 페이지로 들어왔습니다..</p>
            <button className="p-4 text-white border border-white rounded-lg">
                <Link href="/">
                    홈페이지로 돌아가기
                </Link>
                </button>
        </div>
    )
}