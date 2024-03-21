import { Demo } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input, TextArea } from "@/components/ui/input"
import { Query, QueryResponse } from "@/lib/sibyl"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react"
import { ethers } from "ethers"
import { useState } from "react"

interface EducationDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function EducationDemo({ signer }: EducationDemoProps) {
    const [queryResponse, setQueryResponse] = useState<QueryResponse | undefined>()
    const [currentAnswer, setCurrentAnswer] = useState<string>("")

    const demoQuestion = "What is the capital of France?"

    const educationDemoRequest = (answer: string) => {
        const finalQuestion = "Evaluate the answer to this question: \n" +  demoQuestion + "\n" + answer

        const queryInfo = {
            question: finalQuestion,
            signer: signer,
            setQueryResponse: setQueryResponse,
        }
        Query(queryInfo)
    }

    return (
        <div className="my-8">
            <div className="bg-gradient-to-r from-transparent via-[hsl(var(--accent))] dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <LabelInputContainer className="mb-4">
                <Label htmlFor="answer">{demoQuestion}</Label>
                <TextArea id="answer" placeholder="Paris" className="w-[300px] h-[300px] p-10 break-all" onChange={(v) => setCurrentAnswer(v.target.value)}/>
            </LabelInputContainer>

            <Button
                className="bg-gradient-to-br relative group/btn from-[hsl(var(--secondary))] to-[hsl(var(--secondary))] text-[hsl(var(--background))] block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                onClick = {() => educationDemoRequest(currentAnswer)}
            >
                Ask the oracle
                <BottomGradient />
            </Button>

            <div className="bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent my-8 h-[1px] w-full" />

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