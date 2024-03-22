import { Button } from "../ui/button"
import { BottomGradient } from "../ui/utils"

interface DemoButtonProps {
    onClick: () => void
}

export default function DemoButton({onClick, children}: React.PropsWithChildren<DemoButtonProps>) {
    
    return (
        <Button
                className="bg-gradient-to-br relative group/btn from-[hsl(var(--secondary))] to-[hsl(var(--secondary))] text-[hsl(var(--background))] block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                onClick = {onClick}
            >
                {children}
            <BottomGradient />
        </Button>
    )

}