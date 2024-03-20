import { ethers } from "ethers"

export interface QueryProps {
    signer: ethers.JsonRpcSigner
    question: string
    model?: number
    responseType?: number
    options?: {value: bigint}
}



export function Query({signer, question, model = 1, responseType = 1, options = {value: ethers.parseEther("1.0")}} : QueryProps) {
    try {
        const sibylAbi = require("@/lib/Sibyl.json")                        // contract info
        const sibylDeploymentInfo = require("@/lib/SibylDeployment.json")   // deployment info
        
        const sibyl = new ethers.Contract(
            sibylDeploymentInfo.deployedTo,
            sibylAbi.abi,
            signer
        )

        // console.log(sibyl.getFunction("query")) // incredibly useful. You can right-click "store as global variable" and debug through the browser.
        sibyl.query(question, model, responseType, options).then((result: any) => {
            return result
        })
    } catch (error) {
        console.warn(error)
    }
}