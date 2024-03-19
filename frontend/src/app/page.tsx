"use client"

import { useState } from "react";
import Header from "./Header/Header";
import { ethers } from "ethers";

export default function Home() {
  const [hasWallet, setHasWallet] = useState(false)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(undefined)

  // window.ethereum will exist if user has EIP-1193 wallet installed
  if (window && window.ethereum && !hasWallet) {
      setHasWallet(true)
  }

  return (
    <div className="main-div flex flex-col min-h-dvh items-center justify-between ">
      <Header className="main-div-auth-child" setSigner={setSigner} hasWallet={hasWallet} signer={signer}/>
      <main className="bg-[#00ff00] main-div-auth-child">
        placeholder main
      </main>
      <footer className="bg-[#0000ff] main-div-auth-child">
        placeholder footer
      </footer>
    </div>
  );
}
