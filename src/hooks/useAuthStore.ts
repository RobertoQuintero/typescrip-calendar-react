import { clearErrorMessage, onLogin, onLogout, onLogoutCalendar, useAppSelector } from "../store"
import { calendarApi } from "../api"
import { useAppDispatch } from '../store/store';

interface login{
  email:string
  password:string
}
interface register{
  name:string
  email:string
  password:string
}

export const useAuthStore = () => {
  const {status,user,errorMessage} =useAppSelector(state=>state.auth)
  const dispatch = useAppDispatch();

  const startLogin =async({email,password}:login)=>{
    try {
      const {data}=await calendarApi.post('/auth',{email,password})

      localStorage.setItem('token',data.token)
      localStorage.setItem('token-init-date',new Date().getTime().toString())
      dispatch(onLogin({ name:data.name,uid:data.uid}))
      
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  const startRegister=async({name,email,password}:register)=>{
    try {
      const {data}=await calendarApi.post('/auth/new',{email,password,name})

      localStorage.setItem('token',data.token)
      localStorage.setItem('token-init-date',new Date().getTime().toString())
      dispatch(onLogin({ name:data.name,uid:data.uid}))
      
    } catch (error:any) {
      console.log(error.response.data.msg)
      dispatch(onLogout(error.response.data.msg))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  const checkAuthToken=async()=>{
    const token= localStorage.getItem('token')
    if(!token)return dispatch(onLogout(undefined))

    try {
      const {data}= await calendarApi.get('/auth/renew')
      localStorage.setItem('token',data.token)
      localStorage.setItem('token-init-date',new Date().getTime().toString())
      dispatch(onLogin({ name:data.name,uid:data.uid}))
    } catch (error) {
      console.log(error)
      localStorage.clear()
      dispatch(onLogout(undefined))
      
    }
  }

  const startLogout=()=>{
    localStorage.clear()
    dispatch(onLogout(undefined))
    dispatch(onLogoutCalendar())
  }

  return  {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }
}
