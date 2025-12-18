import { ExampleContext } from "@/context/ExampleContext"
import { useContext } from "react"
import { Switch } from "../ui/switch"
 
 
const CustomSwitch = () => {
     const {handleToggle} = useContext(ExampleContext)
   ('render')
  return (
    <Switch onClick={handleToggle}/>
  )
}

export default CustomSwitch