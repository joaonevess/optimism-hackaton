import { Button } from "@/components/ui/button"
import { TextArea } from "@/components/ui/input"
import { Query, QueryResponse, responseType } from "@/lib/sibyl"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"
import { ethers } from "ethers"
import { useState } from "react"

interface EducationDemoProps {
    signer: ethers.JsonRpcSigner
}

/*
Explanation of use case:
Grading of subjective questions is hard to automate. By using a decentralized oracle, we can guarantee a fair and unbiased grading of subjective questions.
The transparency provided by the Blockchain guarantees the integrity of the grading process, which a traditional "closed box" grading system cannot provide.

Example of usecases:
- Evaluation of public exams
- Evaluation of exams in online courses
- Evaluation of tests which should be impartial and unbiased (e.g. job applications)
- Evaluating questions where the student and the teacher disagree on the grading
*/

export default function EducationDemo({ signer }: EducationDemoProps) {
    const [queryResponse, setQueryResponse] = useState<QueryResponse | undefined>()
    const [currentAnswer, setCurrentAnswer] = useState<string>("")

    const demoQuestion = "What was the French Revolution?"

    const educationDemoRequest = (answer: string) => {
        const finalQuestion = "Evaluate the answer to this question with a grade between 0 and 100: \n" +  demoQuestion + "\n" + answer

        const queryInfo = {
            signer: signer,
            question: finalQuestion,
            responseType: responseType.BIGINT,
            setQueryResponse: setQueryResponse,
        }
        Query(queryInfo)
    }

    return (
        <div className="my-8">
            <div className="bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent my-8 h-[1px] w-full" />

            <LabelInputContainer className="mb-4">
                <Label htmlFor="answer">{demoQuestion}</Label>
                <TextArea id="answer" placeholder="Your answer" className="w-[300px] h-[300px] p-10 break-all" onChange={(v) => setCurrentAnswer(v.target.value)}/>
            </LabelInputContainer>

            <Button
                className="bg-gradient-to-br relative group/btn from-[hsl(var(--secondary))] to-[hsl(var(--secondary))] text-[hsl(var(--background))] block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                onClick = {() => educationDemoRequest(currentAnswer)}
            >
                Ask the oracle
                <BottomGradient />
            </Button>
            <div className="bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent my-8 h-[1px] w-full" />
            {queryResponse !== undefined && (
                <div>
                    <div className="text-center">
                        <span className="text-[hsl(var(--accent))] font-bold">Sibyl </span>
                        <span>has graded your answer:</span>
                        </div>
                    <div className="text-[hsl(var(--secondary))] text-center text-[30px]">{queryResponse?.toString()}</div>
                </div>
            )}
        </div>
    )

}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};