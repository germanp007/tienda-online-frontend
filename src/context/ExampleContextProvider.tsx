import { useState, type PropsWithChildren } from "react"
import { ExampleContext } from "./ExampleContext"

export const ExampleContextProvider = ({children}: PropsWithChildren)=>{

    const [toggle, setToggle] = useState(false)
     
    const handleToggle = ()=>{
        setToggle(prev => !prev)
    }
     (toggle)
    return(
        <ExampleContext value={{toggle, handleToggle}}>
            {children}
        </ExampleContext>
    )
}