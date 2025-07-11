import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { AuthHeader } from "./auth-header"
import { BackButton } from "./back-button"

interface cardWrapperProps{
    title:string,
    label:string,
    backButtonHref:string,
    backButtonLabel:string,
    children:React.ReactNode
}

export const CardWrapper = ({title,label,backButtonHref,backButtonLabel, children}:cardWrapperProps) => {
    return(
        <Card className="xl:max-w-sm md:w-1/2 shadow-md">
            <CardHeader>
                <AuthHeader label={label} title={title}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>
        </Card>
    )
}