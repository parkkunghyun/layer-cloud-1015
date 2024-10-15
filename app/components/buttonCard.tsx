"use client"

import { Button } from "@material-tailwind/react"

interface ButtonCardProps {
    text : string
}

export default function ButtonCard({text}: ButtonCardProps) {

    return (
        <Button className="p-4 text- bg-[#C6DBDA] shadow-lg rounded-lg "placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {text}
        </Button>
    )
}
