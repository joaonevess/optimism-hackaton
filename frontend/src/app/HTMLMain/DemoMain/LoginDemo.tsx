import { Demo } from "@/app/page"
import { Button } from "@/components/ui/button"
import { ethers } from "ethers"
import { useState } from "react"

interface LoginDemoProps {
    setSigner: (signer: ethers.JsonRpcSigner | undefined) => void
    setCurrDemo: (demo: Demo) => void
}

export default function LoginDemo({setSigner, setCurrDemo} : LoginDemoProps) {
    const [hasWallet, setHasWallet] = useState(false)

    const firstDemo = Demo.education

    // window.ethereum will exist if user has EIP-1193 wallet installed
    if (window && window.ethereum && !hasWallet) {
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
        <Button onClick={connectWallet} className="rounded-full w-[300px] h-[300px]">
            <p className="text-white text-[15rem]">
                ⟠
            </p>
        </Button>
    )

}