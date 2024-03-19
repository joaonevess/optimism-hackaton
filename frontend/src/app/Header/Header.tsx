import ConnectWalletButton from "./ConnectWalletButton";

export default function Header({className} : {className: string}) {


    return (
        <header className={`${className} flex-row flex-nowrap justify-between w-full px-10 py-5`}>
            <div>Logo</div>
            {/* <div>Test2</div> */}
            <ConnectWalletButton/>
        </header>
    )

}