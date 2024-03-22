import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/input";
import { BottomGradient, LabelInputContainer } from "@/components/ui/utils";
import { Query, QueryResponse, ResponseType } from "@/lib/sibyl";
import { Label } from "@radix-ui/react-label";
import { ethers } from "ethers";
import { useState } from "react";

/*
Explanation of use case:
Legal compliance, especially in an international context, is a complex and time-consuming process. By using a decentralized oracle, we can get a quick and (mostly) reliable answer to legal questions.
While this is not a substitute for legal advice, it can be a useful tool to get a quick overview of the legal situation. Ideally, this would be used to flag potential issues that need further investigation by a legal expert.

Example of usecases:
- Legal verification by decentralized contracts before a transaction is executed.
- Historical proof of compliance verification for audits.
- Quick and cheap way for small businesses to avoid legal pitfalls.
*/

interface ComplianceDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function ComplianceDemo({ signer }: ComplianceDemoProps) {
    const [queryResponse, setQueryResponse] = useState<QueryResponse | undefined>()
    const [contract, setContract] = useState<string>("")
    const [country, setCountry] = useState<string>("China")

    const demoHeader = "Clause to be verified:"

    const complianceDemoRequest = () => {
        const finalQuestion = "Is the following contractual clause compliant with the laws of " + country + "?\n" + contract

        const queryInfo = {
            signer: signer,
            question: finalQuestion,
            responseType: ResponseType.BOOLEAN,
            setQueryResponse: setQueryResponse,
        }
        Query(queryInfo)
    }


    return (
        <div className="my-8">
        <div className="bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent my-8 h-[1px] w-full" />

        <LabelInputContainer className="mb-4">
            <Label htmlFor="answer">{demoHeader}</Label>
            {/* TODO: Add a country selector here */}
            <TextArea id="answer" placeholder="Your answer" className="w-[300px] h-[300px] p-10 break-all" onChange={(v) => setContract(v.target.value)}/>
        </LabelInputContainer>

        <Button
            className="bg-gradient-to-br relative group/btn from-[hsl(var(--secondary))] to-[hsl(var(--secondary))] text-[hsl(var(--background))] block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            onClick = {() => complianceDemoRequest()}
        >
            Ask the oracle
            <BottomGradient />
        </Button>
        <div className="bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent my-8 h-[1px] w-full" />
        {queryResponse !== undefined && (
            <div>
                <div className="text-center">
                    <span className="text-[hsl(var(--accent))] font-bold">Sibyl </span>
                    <span>thinks this contract is:</span>
                    </div>
                <div className="text-[hsl(var(--secondary))] text-center text-[30px]">{queryResponse !==undefined && queryResponse ? "Compliant" : "Non-compliant"}</div>
            </div>
        )}
    </div>
    )
}