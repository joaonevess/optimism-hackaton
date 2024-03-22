import { ethers } from "ethers";
import { useState } from "react";

/*
Explanation of use case: 
We can only evaluate contracts with information that is already integrated into the blockchain. By using a decentralized AI oracle, we can have a contract be resolved through the AI's output. This could include both objective (but not integrated into the blockchain) information and subjective information. This is even more powerful for contracts that require information only available in the future.

Example of usecases:
- Judging clauses related to events that have no oracle yet (e.g. "Will the rains in Greece be above average next year?")
- Judging clauses related to subjective information (e.g. "Will the next movie by X director be good?")
*/

interface SageDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function SageDemo({ signer }: SageDemoProps) {
    const [queryResponse, setQueryResponse] = useState<string | undefined>()
    const [clause, setClause] = useState<string>("")

    const demoHeader = "Event to be verified:"
    
    const SageDemoRequest = () => {
        const finalQuestion = "Will the following event happen? \n" + clause
    }
    return (
        <div>Forecast</div>
        )
    }

