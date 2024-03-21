"use client"

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

interface HeaderProps {
    className: string
}

export default function Header({className} : HeaderProps) {
    const { theme, setTheme } = useTheme()

    const changeTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <div className={`${className} flex items-center space-x-2 py-3`}>
            <span>Ἥλιος </span>
            <Switch id="theme" checked={theme==="dark"} onCheckedChange={changeTheme}/>
            <span>Σελήνη</span>
        </div>
    )
}