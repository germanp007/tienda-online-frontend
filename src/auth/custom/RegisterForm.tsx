import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import  registerImage from '../../assets/register.jpg'
import CustomLogo from "@/components/custom/CustomLogo"
import { Link, useNavigate } from "react-router" 
import CustomInputPassword from "./CustomInputPassword"  
import { toast } from "sonner"
import { useAuthStore } from "../store/auth.store"
 
const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { register } = useAuthStore();
    const navigate = useNavigate()
    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{
       event.preventDefault();
       const datosParaEnviar:Record<string,unknown> = {}
       if(!event.target) return; 
       const formToSend = new FormData(event.target as HTMLFormElement)
      for(const [key,value] of formToSend.entries()){
        datosParaEnviar[key] = value;
      };
      if(datosParaEnviar['password'] !== datosParaEnviar['re-password']){
       return toast.error('Las contraseñas no coinciden')
      }
      
      const isSuccess = await register(datosParaEnviar.email as string, datosParaEnviar.password as string, datosParaEnviar.fullName as string);
      if(isSuccess){
        toast.success('Usuario Registrado con Exito')
        setTimeout(() => {
          return navigate('/auth/login', {replace:true})
        }, 1000);
      } else{
        toast.error('Error al registrar')
      }

    }; 
 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit} >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl">Crear Cuenta</h1>
                <p className="text-balance text-muted-foreground">Registrate y Disfruta del Servicio</p>
              </div>
               <div className="grid gap-2">
                <Label htmlFor="fullName">Nombre y Apellido</Label>
                <Input name="fullName" id="fullName" type="text" placeholder="Mario Lopez" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="text" placeholder="mario@google.com" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label> 
                </div>
                <CustomInputPassword nameRef='password'/>
              
              </div>
               <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="re-password">Repetir Password</Label>
                   
                </div>
                <CustomInputPassword nameRef='re-password'/>
              
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
               
              <div className="text-center text-sm">
                Ya tienes Cuenta?{" "}
                <Link to={'/auth/login'} className="underline underline-offset-4">
                  Ingresa acá
                </Link>
              </div>
            </div>
          </form>
          <div className="relative size-full hidden md:block">
            <div className="absolute size-full bg-black z-10 opacity-45"></div>
            <CustomLogo style="absolute z-10 text-white text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
            <img
              src={registerImage}
              alt="Image"
              className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default RegisterForm;
