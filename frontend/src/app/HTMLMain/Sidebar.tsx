"use client"

import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import Education from "@/components/svgs/education";
import { Demo } from "./HTMLMain";
import Compliance from "@/components/svgs/compliance";
import Judge from "@/components/svgs/judge";
import Sage from "@/components/svgs/sage";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SidebarProps {
    signer: ethers.JsonRpcSigner | undefined
    setCurrDemo: (demo: Demo) => void
}

export default function Sidebar(props: React.PropsWithChildren<SidebarProps>) {
    const { signer, setCurrDemo, children } = props
    const [pageWidth, setPageWidth] = useState<number>(1)
    const { theme, setTheme } = useTheme()

    const hasWindow = typeof window !== "undefined"
    // TODO: Make this reactive
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageWidth(window.innerWidth)
            window.addEventListener("resize", () => {
                setPageWidth(window.innerWidth)
            })
        }
    }, [hasWindow])
        

    // All distances and sizes themed around phi and 12, since they were sacred numbers for the ancient greek
    const phi = 1.61803398875
    const buttonSize = 12 * 12
    const iconSize = Math.round(buttonSize / phi)

    const buttonHalfYDistance = Math.round(buttonSize * phi)

    const m = phi
    const y = 2 * buttonHalfYDistance + buttonSize
    const x = y * m

    const buttonXDistance = Math.round((pageWidth - x - buttonSize) / 2) // x/y = m

    const buttonContainerStyle = {
        paddingLeft: buttonXDistance,
        paddingRight: buttonXDistance,
    }
    const leftButtonCointainerStyle = {
        ...buttonContainerStyle,
        paddingRight: 0,
    }
    const rightButtonContainerStyle = {
        ...buttonContainerStyle,
        paddingLeft: 0,
    }

    const buttonStyle = {
        marginTop: buttonHalfYDistance,
        marginBottom: buttonHalfYDistance,
        fontSize: iconSize,
        width: buttonSize,
        height: buttonSize,
    }
    const topButtonStyle = {
        ...buttonStyle,
        marginTop: 0,
    }
    const bottomButtonStyle = {
        ...buttonStyle,
        marginBottom: 0,
    }

    const sageClass = theme === "dark" ? "stroke-[hsl(var(--foreground))]" : "stroke-[hsl(var(--foreground))] fill-[hsl(var(--foreground))]"

    return (
        <div className={"w-full flex flex-row justify-between items-center"}>
            <div className="flex flex-col" style={leftButtonCointainerStyle}>
                <Button className={!signer ? "hidden" : "rounded-full"} style={topButtonStyle} onClick={() => setCurrDemo(Demo.education)}><Education className="stroke-[hsl(var(--foreground))] fill-none"/></Button>
                <Button className={!signer ? "hidden" : "rounded-full"} style={bottomButtonStyle} onClick={() => setCurrDemo(Demo.compliance)}><Compliance className="stroke-[hsl(var(--foreground))]"/></Button>
            </div>
            {children}
            <div className="flex flex-col" style={rightButtonContainerStyle}>
                <Button className={!signer ? "hidden" : "rounded-full"} style={topButtonStyle} onClick={() => setCurrDemo(Demo.judge)}><Judge className="stroke-[hsl(var(--foreground))]"/></Button>
                <Button className={!signer ? "hidden" : "rounded-full"} style={bottomButtonStyle} onClick={() => setCurrDemo(Demo.sage)}><Sage className={sageClass}/></Button>
            </div>
        </div>

    )

}


