import { Link } from "react-router-dom"
import { Button } from "../ui/button"

interface backButtonProps{
    label:string,
    href:string,
}

export const BackButton = ({label, href}:backButtonProps) => {
    return(
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
            <Link to={href}>
                {label}
            </Link>
        </Button>
    )
}