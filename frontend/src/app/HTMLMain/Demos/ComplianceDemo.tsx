import DemoButton from "@/components/demo/DemoButton";
import { DemoCountrySelector } from "@/components/demo/DemoCountrySelector";
import DemoResponse from "@/components/demo/DemoResponse";
import DemoSeparator from "@/components/demo/DemoSeparator";
import DemoTextArea from "@/components/demo/DemoTextArea";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/input";
import { BottomGradient, LabelInputContainer } from "@/components/ui/utils";
import { Query, QueryResponse, ResponseType } from "@/lib/sibyl";
import { Label } from "@radix-ui/react-label";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

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
    const [queryResponse, setQueryResponse] = useState<string | undefined>()
    const [contract, setContract] = useState<string>("")
    const [country, setCountry] = useState<string>("China")

    const demoHeader = "Clause to be verified:"

    const complianceDemoRequest = () => {
        const finalQuestion = "Is the following contractual clause compliant with the laws of " + country + "?\n" + contract

        const evalResponse = (response: boolean) => {
            if (response) {
                setQueryResponse("Compliant")
            } else {
                setQueryResponse("Not compliant")
            }
        }

        const queryInfo = {
            signer: signer,
            question: finalQuestion,
            responseType: ResponseType.BOOLEAN,
            setQueryResponse: evalResponse,
        }
        Query(queryInfo)
    }

    return (
        <div className="my-8">
            <DemoSeparator/>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="answer">Country to verify</Label>
                <DemoCountrySelector setCountry={setCountry}/>
                <Label htmlFor="answer">{demoHeader}</Label>
                <DemoTextArea setValue={setContract} placeholder="Your clauses"/>
            </LabelInputContainer>

            <DemoButton onClick={complianceDemoRequest}>
                Check compliance
            </DemoButton>

            <DemoSeparator/>
            
            <DemoResponse queryResponse={queryResponse} introText="thinks these clauses are:"/>

        </div>
    )
}