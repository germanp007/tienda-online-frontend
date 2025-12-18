import { createContext } from "react";


interface ContextProps {
    toggle: boolean,
    handleToggle: ()=> void
}


export const ExampleContext = createContext({} as ContextProps);
