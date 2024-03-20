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
        // TODO: Automatically move Sibyl.json to that folder when building
        // This imports the contract's definition and creates a Contract "class". The json comes from sibyl/out/Sibyl.sol/Sibyl.json
        const contractAbi = require("@/lib/Sibyl.json")
        // console.log(contractAbi.abi) // all the functions and events and other things we're importing from the contract
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        
        const sibyl = new ethers.Contract(
            contractAddress,
            contractAbi.abi,
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