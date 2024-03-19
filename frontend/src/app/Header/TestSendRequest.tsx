import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useState } from "react";

// Test button that sengs a question to the contract. Seemingly works.
// Will eventually be deleted but, for now, shall stay to help anyone who wants to see how it's done.
export default function TestSendRequest({signer} : {signer: any}){
    const [result, setResult] = useState<string>("send test request")

    const testSibylQuery = async () => {
        try {
            // TODO: Automatically move Sibyl.json to that folder when building
            // This imports the contract's definition and creates a Contract "class". The json comes from sibyl/out/Sibyl.sol/Sibyl.json
            const contractAbi = require("@/lib/Sibyl.json")
            const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
            const sibyl = new ethers.Contract(
                contractAddress,
                contractAbi.abi,
                signer
            )
            
            // parameter definitions. It seems like functions take in tuples, which in javascript just mean arrays. 
            const question = "What is the meaning of life?"
            const model = 2
            const responseType = 2

            const request = [question, model, responseType]

            sibyl.query(request).then((result: any) => {
                console.log(result)
                setResult(result.hash)
            })
        } catch (error) {
            console.warn(error)
        }
    }

    
    return (
        <Button onClick={testSibylQuery} disabled={!signer}>
            {result}
        </Button>
    )
}

