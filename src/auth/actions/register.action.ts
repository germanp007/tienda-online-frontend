import { tesloApi } from "@/api/teslo.api";
import type { AuthResponse } from "./types/login.auth.interface";


export const registerAction = async(email:string,password:string,fullName:string):Promise<AuthResponse>=>{

    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register',{
            email:email,
            password:password,
            fullName:fullName
        });
        return data
    } catch (error) {
       console.log(error);
        throw error;
    }

}