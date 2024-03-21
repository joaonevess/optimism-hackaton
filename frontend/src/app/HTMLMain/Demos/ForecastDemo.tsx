import { ethers } from "ethers";

interface ForecastDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function ForecastDemo({ signer }: ForecastDemoProps) {

    return (
        <div>Forecast</div>
    )
}