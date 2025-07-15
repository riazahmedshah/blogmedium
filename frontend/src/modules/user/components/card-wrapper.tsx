import { Card, CardContent, CardHeader } from "@ui/card"

interface cardWrapperProps{
    title:string,
    label:string,
    children:React.ReactNode
}


export const CardWrapper = ({title,label,children}:cardWrapperProps) => {
  return(
    <Card className="max-w-7xl mx-auto p-6 my-8">
      <CardHeader>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {label}
          </p>
      </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}