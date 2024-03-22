import DemoButton from "@/components/demo/DemoButton"
import DemoResponse from "@/components/demo/DemoResponse"
import DemoSeparator from "@/components/demo/DemoSeparator"
import DemoTextArea from "@/components/demo/DemoTextArea"
import { LabelInputContainer } from "@/components/ui/utils"
import { Query, QueryResponse, ResponseType } from "@/lib/sibyl"
import { Label } from "@radix-ui/react-label"
import { ethers } from "ethers"
import { useState } from "react"

/*
Explanation of use case:
Grading of subjective questions is hard to automate. By using a decentralized oracle, we can guarantee a fair and unbiased grading of subjective questions.
The transparency provided by the Blockchain guarantees the integrity of the grading process, which a traditional "closed box" grading system cannot provide.

Example of usecases:
- Evaluation of public exams.
- Evaluation of exams in online courses.
- Evaluation of tests which should be impartial and unbiased (e.g. job applications).
- Evaluating questions where the student and the teacher disagree on the grading.
*/

interface EducationDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function EducationDemo({ signer }: EducationDemoProps) {
    const [queryResponse, setQueryResponse] = useState<QueryResponse | undefined>()
    const [currentAnswer, setCurrentAnswer] = useState<string>("")

    const demoQuestion = "What was the French Revolution?"

    const educationDemoRequest = () => {
        const finalQuestion = "Evaluate the answer to this question with a grade between 0 and 100: \n" +  demoQuestion + "\n" + currentAnswer

        const queryInfo = {
            signer: signer,
            question: finalQuestion,
            responseType: ResponseType.BIGINT,
            setQueryResponse: setQueryResponse,
        }
        Query(queryInfo)
    }

    return (
        <div className="my-8">
            <DemoSeparator/>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="answer">{demoQuestion}</Label>
                <DemoTextArea placeholder="Your answer" setValue={setCurrentAnswer}/>
            </LabelInputContainer>

            <DemoButton onClick={educationDemoRequest}>
                Grade this answer
            </DemoButton>

            <DemoSeparator/>
            
            <DemoResponse queryResponse={queryResponse?.toString()} introText="has graded your answer:"/>
        </div>
    )

}
