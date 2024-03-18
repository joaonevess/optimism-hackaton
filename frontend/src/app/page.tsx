import Image from "next/image";

export default function Home() {
  return (
    <div className="main-div flex flex-col min-h-dvh justify-between ">
      <header className="bg-[#ff0000] main-div-auth-child">
        placeholder header  
      </header>
      <main className="bg-[#00ff00] main-div-auth-child">
        placeholder main
      </main>
      <footer className="bg-[#0000ff] main-div-auth-child">
        placeholder footer
      </footer>
    </div>
  );
}
