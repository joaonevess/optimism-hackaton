import { Button } from "@/components/ui/button";
import { JsonRpcSigner, ethers } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";

export interface ConnectWalletButtonProps {
    setSigner: (signer: ethers.JsonRpcSigner | undefined) => void
    hasWallet: boolean
    signer: ethers.JsonRpcSigner | undefined
}


export default function ConnectWalletButton({setSigner, hasWallet, signer} : ConnectWalletButtonProps){

    const connectWallet = () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            console.log(provider)
            provider.getSigner().then((providedSigner) => {
                setSigner(providedSigner)
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
    <Button onClick={connectWallet} disabled={!hasWallet}>
        {hasWallet ? (signer ? "connected" : 'Connect Wallet') : 'Install an Ethereum wallet'}
    </Button>
    )
}