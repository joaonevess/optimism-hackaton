"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function ConnectWalletButton(){
    const [isConnected, setIsConnected] = useState(false)
    const [address, setAddress] = useState('')
    const [hasWallet, setHasWallet] = useState(false)
    
    // window.ethereum will exis if user has EIP-1193 wallet installed
    if (window.ethereum && !hasWallet) {
        setHasWallet(true)
    }

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAddress(accounts[0])
            setIsConnected(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
    <Button onClick={connectWallet} disabled={!hasWallet}>
        {hasWallet ? (isConnected ? address : 'Connect Wallet') : 'Install an Ethereum wallet'}
    </Button>
    )
}