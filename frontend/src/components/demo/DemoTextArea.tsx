import { TextArea } from "../ui/input"

interface DemoTextAreaProps {
    setValue: (value: string) => void
    placeholder?: string
}

export default function DemoTextArea({ setValue, placeholder = "Your input"}: DemoTextAreaProps) {
    
    return (
        <TextArea id="answer" placeholder={placeholder} className="w-[300px] h-[300px] p-10 break-words" onChange={(v) => setValue(v.target.value)}/>
    )

}