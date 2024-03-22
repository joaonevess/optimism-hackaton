import { ethers } from "ethers"

export interface QueryProps {
    signer: ethers.JsonRpcSigner
    question: string
    setQueryResponse: (response: any) => void
    responseType?: number
    options?: { value: bigint }
}

export enum ResponseType {
    BOOLEAN,
    BIGINT,
    STR
}

export type QueryResponse = bigint | string | boolean

export function Query({ signer, question, setQueryResponse, responseType = 0, options = { value: ethers.parseEther("1.0") } }: QueryProps): Promise<any> | undefined {
    const sibylAbi = require("@/lib/Sibyl.json")                        // contract info
    const sibylDeploymentInfo = require("@/lib/SibylDeployment.json")   // deployment info

    const sibyl = new ethers.Contract(
        sibylDeploymentInfo.deployedTo,
        sibylAbi.abi,
        signer
    )
    // sibyl.registerDataProvider("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    const filter = sibyl.filters.QueryRequested(null, null, null, signer.address)

    // If this works, it's probably for the reason you think :)
    sibyl.once(filter, (event) => {
        const requestId = event.args[0]
        console.log("Request ID:")
        console.log(requestId)

        hardCheck(sibyl, requestId, responseType, setQueryResponse)

        // sibyl.once(filter2, (_response) => {
        //     sibyl.readResponse(requestId).then((queryResult) => {
        //         console.log("queryResult")
        //         console.log(queryResult)
        //         setQueryResponse(queryResult[responseType])
        //     })
        // })


                
        // const filter2 = sibyl.filters.QueryCompleted(requestId)

        // sibyl.getQueryStatus(requestId).then((status) => {
        //     console.log("status")
        //     console.log(status)
        //     if (Number(status) === 1) {
        //         console.log("reading straight away")
        //         sibyl.readResponse(requestId).then((queryResult) => {
        //             console.log("queryResult")
        //             console.log(queryResult)
        //             setQueryResponse(queryResult[responseType])
        //         })
        //     }
        // })

    })

    return sibyl.query(question, responseType, options)
}


const hardCheck = (sibyl: any, requestId: any, responseType: any, setQueryResponse: any) => {
    sibyl.readResponse(requestId).then((queryResult: any) => {
        console.log("queryResult")
        console.log(queryResult)
        setQueryResponse(queryResult[responseType])
    })
    .catch((error: any) => {
        console.log("error")
        console.log(error)
        setTimeout(() => hardCheck(sibyl, requestId, responseType, setQueryResponse), 2000)
    })
}

