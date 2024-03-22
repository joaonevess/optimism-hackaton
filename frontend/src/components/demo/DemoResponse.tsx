
interface DemoResponseProps {
    queryResponse: string | undefined
    introText: string
}

export default function DemoResponse({queryResponse, introText}: DemoResponseProps) {
    
    return (
        <>
            {queryResponse !== undefined && (
                <div>
                    <div className="text-center">
                        <span className="text-[hsl(var(--accent))] font-bold">Sibyl </span>
                        <span>{introText}</span>
                    </div>
                    <div className="text-[hsl(var(--secondary))] text-center text-[30px]">{queryResponse?.toString()}</div>
                </div>
            )}
        </>
    )

}