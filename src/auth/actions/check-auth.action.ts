import { tesloApi } from "@/api/teslo.api";
import type { AuthResponse } from "./types/login.auth.interface";

export const checkAuthAction = async():Promise<AuthResponse>=>{

    const token = localStorage.getItem('token');

    if(!token) throw new Error('Token not found');
    
    try {
        const { data } = await tesloApi.get<AuthResponse>( '/auth/check-status' );

        localStorage.setItem('token', data.token);

        return data;
        
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        throw new Error('Token invalid')
    }
}