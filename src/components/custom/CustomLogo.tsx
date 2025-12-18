import { Link } from "react-router"

interface Props{
    subtitle?: string
    style?: string
} 

const CustomLogo = ({subtitle = 'Shop', style=''}: Props) => {
  return (
    <Link to={'/'} className={`${style} flex items-center whitespace-nowrap`}>
        <span className={`font-montserrat font-bold m-0 whitespace-nowrap ${style ? '' : 'text-xl'}`} >
            Teslo |
        </span>
        <p className={`${style ? 'text-white' : 'text-muted-foreground' } m-0 px-2 whitespace-nowrap`}>{subtitle}</p>
    </Link>
  )
}

export default CustomLogo