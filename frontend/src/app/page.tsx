"use client"

import { useState } from "react";
import Header from "./Header/Header";
import { ethers } from "ethers";
import { useTheme } from "next-themes";
import HTMLMain from "./HTMLMain/HTMLMain";

// TODO: Define which ones we should actually demo
export enum Demo {
  login,
  education,
  logistiscs,
  finances,
  privacy
}

export default function Home() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(undefined)
  const [currDemo, setCurrDemo] = useState<Demo>(Demo.login)

  // TODO: Add a theme change button. Ideally, use a greek moon and sun icon.
  // TODO: fix flow for when user disconnects wallet from wallet itself.
  return (
    <div className="main-div flex flex-col min-h-dvh items-center justify-between ">
      {/* <Header className="main-div-auth-child" setSigner={setSigner} hasWallet={hasWallet} signer={signer}/> */}
      <div className="main-div-auth-child"></div>
      <HTMLMain className="main-div-auth-child" setSigner={setSigner} signer={signer} currDemo={currDemo} setCurrDemo={setCurrDemo}/>
      <footer className="bg-[#0000ff] main-div-auth-child">
        placeholder footer
      </footer>
    </div>
  );
}
