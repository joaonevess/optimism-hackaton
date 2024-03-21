import { ethers } from "ethers"

export interface QueryProps {
    signer: ethers.JsonRpcSigner
    question: string
    setRequestId: (requestId: any) => void
    model?: number
    responseType?: number
    options?: {value: bigint}
}

export function Query({signer, question, setRequestId, model = 1, responseType = 1, options = {value: ethers.parseEther("1.0")}} : QueryProps) : Promise<any> | undefined{
    try {
        const sibylAbi = require("@/lib/Sibyl.json")                        // contract info
        const sibylDeploymentInfo = require("@/lib/SibylDeployment.json")   // deployment info
        
        const sibyl = new ethers.Contract(
            sibylDeploymentInfo.deployedTo,
            sibylAbi.abi,
            signer
        )

        const filter = {
            address: sibyl.address,
            topics: [ethers.id("QueryRequested(address,uint256)")]
        }

        sibyl.once("QueryRequested", (requestId) => {
            setRequestId(requestId)
            console.log(`Request ID: ${requestId}`)
        })

        return sibyl.query(question, model, responseType, options)
    } catch (error) {
        console.error(error)
    }
}