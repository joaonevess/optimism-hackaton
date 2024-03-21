import { ethers } from "ethers"

export interface QueryProps {
    signer: ethers.JsonRpcSigner
    question: string
    setQueryResponse: (response: any) => void
    model?: number
    responseType?: number
    options?: {value: bigint}
}

export type QueryResponse = any

export function Query({signer, question, setQueryResponse, model = 1, responseType = 1, options = {value: ethers.parseEther("1.0")}} : QueryProps) : Promise<any> | undefined{
    try {
        const sibylAbi = require("@/lib/Sibyl.json")                        // contract info
        const sibylDeploymentInfo = require("@/lib/SibylDeployment.json")   // deployment info
        
        const sibyl = new ethers.Contract(
            sibylDeploymentInfo.deployedTo,
            sibylAbi.abi,
            signer
        )
        console.log(sibylAbi)
        
        console.log("sibyl")
        console.log(sibyl)
        // sibyl.registerDataProvider("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

        const filter = sibyl.filters.QueryRequested(null, question, model, responseType)

        sibyl.once(filter, (event) => {
            const requestId = event.args[0]
            console.log("Request ID:")
            console.log(requestId)
            const filter2 = sibyl.filters.QueryCompleted(requestId)
            sibyl.once(filter2, (response) => { 
                sibyl.readResponse(requestId).then((queryResult) => {
                    console.log("queryResult")
                    console.log(queryResult[responseType])
                    setQueryResponse(queryResult[responseType])
                })
            })

            sibyl.fulfillRequest(requestId, [requestId, "Paris", false]).then((tx) => {
                console.log(tx)
            })

        })

        return sibyl.query(question, model, responseType, options)
    } catch (error) {
        console.error(error)
    }
}