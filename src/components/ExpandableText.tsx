import { useState } from "react";
import Button from "./Button"

interface Props{
    children: string
    maxChar?: number
}

export default function ExpandableText ({children, maxChar = 100}: Props) {
    const [isMore, setIsMore] = useState(false);

    if(children.length <= maxChar) return <div>{children}</div>
   return (
    <>
      <div>{!isMore ? children.slice(0, maxChar)+'...': children }
        <Button onClick = {() => setIsMore(!isMore)} color = 'success'>{isMore ? 'Less' : 'More'}</Button>
      </div>
    </>
    )
}


