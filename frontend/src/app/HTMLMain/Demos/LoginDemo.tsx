"use client"

import Metamask from "@/components/svgs/metamask"
import { Button } from "@/components/ui/button"
import { ethers } from "ethers"
import { useState } from "react"
import { Demo } from "../HTMLMain"

interface LoginDemoProps {
    setSigner: (signer: ethers.JsonRpcSigner | undefined) => void
    setCurrDemo: (demo: Demo) => void
}

export default function LoginDemo({setSigner, setCurrDemo} : LoginDemoProps) {
    const [hasWallet, setHasWallet] = useState(false)

    const firstDemo = Demo.education

    // window.ethereum will exist if user has EIP-1193 wallet installed
    if (typeof window !== "undefined" && window.ethereum && !hasWallet) {
        setHasWallet(true)
    }

    const connectWallet = () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            console.log(provider)
            provider.getSigner().then((providedSigner) => {
                setSigner(providedSigner)
                setCurrDemo(firstDemo)
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Button onClick={connectWallet} className="rounded-full w-[300px] h-[300px] flex align-center justify-center">
            <Metamask className="stroke-[hsl(var(--secondary))]"/>
        </Button>
    )

}