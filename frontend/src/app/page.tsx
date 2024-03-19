"use client"

import Header from "./Header/Header";

export default function Home() {
  return (
    <div className="main-div flex flex-col min-h-dvh items-center justify-between ">
      <Header className="main-div-auth-child" />
      <main className="bg-[#00ff00] main-div-auth-child">
        placeholder main
      </main>
      <footer className="bg-[#0000ff] main-div-auth-child">
        placeholder footer
      </footer>
    </div>
  );
}
