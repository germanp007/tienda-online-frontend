import { create } from 'zustand'
import type { User } from '@/interfaces/user.interface'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.action'


type AuthStatus = 'autenticado' | 'no-autenticado' | 'chequeando'
type AuthState = {
  user: User | null,
  token: string | null,
  authStatus : AuthStatus,
  isAdmin: ()=> boolean,
  login: (email:string, password:string)=> Promise<boolean>,
  logout: ()=> void
  checkAuth: ()=> Promise<boolean>
  register: (email:string, password:string, fullName:string)=> Promise<boolean>
}
export const useAuthStore = create<AuthState>()((set,get) => ({
  user: null,
  token: null,
  authStatus: 'chequeando',
  
  // GETTERS
  isAdmin: ()=>{
    const roles = get().user?.roles || [];
    return roles.includes('admin')
  },

  //Actions
  login: async(email:string, password:string)=>{

    try {
      const data = await loginAction(email,password); 
         if(!data.token){
            throw new Error('Credenciales Invalidas')
         }
          localStorage.setItem('token', data.token);
          set({user: data.user, token: data.token, authStatus: 'autenticado'});
          return true
        } catch (error) {
          console.log(error)
          localStorage.removeItem('token')
          set({user: null, token: null, authStatus: 'no-autenticado'});
          return false
    }
  },
  logout: ()=>{
    localStorage.removeItem('token');
    set({user: null, token: null,authStatus: 'no-autenticado'});
  },
  checkAuth: async()=>{
    try {
      const { user, token } = await checkAuthAction();

        set({
          user:user,
          token:token,
          authStatus: 'autenticado'
        })
        return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) { 

       set({
          user:undefined,
          token:undefined,
          authStatus: 'no-autenticado'
        });
        return false;
    }
  },
  register: async(email:string,password:string,fullName:string)=>{

    try {
      const data = await registerAction(email, password, fullName);

      if(!data.token) throw new Error('Error al Registrar');
      return true

    } catch (error) {
      console.log(error)
      return false
    }

  }
  
  
}))
 