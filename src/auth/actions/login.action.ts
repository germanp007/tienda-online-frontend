import { tesloApi } from "@/api/teslo.api"
import type { AuthResponse } from "./types/login.auth.interface";


export const loginAction = async(email:string, password:string):Promise<AuthResponse>=>{
    console.log(email, password, 'Action')
    try { 
        const {data} = await tesloApi.post<AuthResponse>('/auth/login',{
            email:email,
            password:password
        });  
         return data
    } catch (error) {
       console.log(error);
        throw error;
    }
}
 