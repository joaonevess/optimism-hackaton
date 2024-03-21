import { ethers } from "ethers";

interface ComplianceDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function ComplianceDemo({ signer }: ComplianceDemoProps) {

    return (
        <div>Compliance</div>
    )
}