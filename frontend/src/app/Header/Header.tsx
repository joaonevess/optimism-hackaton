import { ethers } from "ethers";
import ConnectWalletButton from "./ConnectWalletButton";
import TestSendRequest from "./TestSendRequest";

interface HeaderProps {
    className: string
    setSigner: (signer: ethers.JsonRpcSigner | undefined) => void
    hasWallet: boolean
    signer: ethers.JsonRpcSigner | undefined
}
// DEPRECATED
export default function Header({className, setSigner, hasWallet, signer} : HeaderProps) {
    return (
        <header className={`${className} flex-row flex-nowrap justify-between w-full px-10 py-5`}>
            {/* <div>Logo</div> */}
            <TestSendRequest signer={signer} />
            <ConnectWalletButton setSigner={setSigner} hasWallet={hasWallet} signer={signer}/>
        </header>
    )
}