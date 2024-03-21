import Header from "./Header/Header";
import HTMLMain from "./HTMLMain/HTMLMain";


export default function Home() {
  
  // TODO: fix flow for when user disconnects wallet from wallet itself.
  return (
    <div className="main-div flex flex-col min-h-dvh items-center justify-between ">
      <Header className="main-div-auth-child" />
      <HTMLMain className="main-div-auth-child"/>
      <div className="main-div-auth-child" />
    </div>
  );
}
