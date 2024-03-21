import { ethers } from "ethers";

interface JudgeDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function JudgeDemo({ signer }: JudgeDemoProps) {

    return (
        <div>Judge</div>
    )
}