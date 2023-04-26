import React from 'react'
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store"
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authStates"
import { act, renderHook, waitFor } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks"
import { Provider } from 'react-redux'
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api'

const getMockStore=(initialState)=>{
  return configureStore({
    reducer:{
      auth:authSlice.reducer
    },
    preloadedState:{
      auth:{...initialState}
    }
  })
}

describe('Pruebas en useAuthStore', () => { 

   beforeEach(()=>localStorage.clear()) 
  test('debe regresar lo valores por defecto', () => {
    const mockStore=getMockStore({...initialState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    expect(result.current).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
      startLogin:expect.any(Function),
      startRegister:expect.any(Function),
      checkAuthToken:expect.any(Function),
      startLogout:expect.any(Function),
    })
  })

  test('startLogin debe realizar el login correctamente', async() => {
    const mockStore=getMockStore({...initialState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    await act(async()=>{
     await result.current.startLogin(testUserCredentials)
    })

    const {errorMessage,status,user} = result.current

    expect({errorMessage,status,user}).toEqual(
      {errorMessage:undefined,
        status:'authenticated',
        user:{ name: 'Test User', uid: '6446a820f93d19a1e8b9828f' }
      }
    )
    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })

  test('startLogin debe fallar la autenticación', async() => {
    const mockStore=getMockStore({...notAuthenticatedState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    await act(async()=>{
     await result.current.startLogin({email:'algo@google.com',password:'12345678'})
    })

    const {errorMessage,status,user} = result.current
    expect(localStorage.getItem('token')).toBe(null)
    expect({errorMessage,status,user}).toEqual({
      errorMessage:expect.any(String),
      status:'not-authenticated',
      user:{}
    })

    await waitFor(
      ()=>expect(result.current.errorMessage).toBe(undefined)
    )
  
  })

  test('startRegister debe realizar el registro', async() => {
    const newUser={email:'algo@google.com',password:'12345678',name:'Test User 2'}
    const mockStore=getMockStore({...notAuthenticatedState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })
    // hacer mock parcial para que no se registre el usuariro en la BD
    const spy=jest.spyOn(calendarApi,'post').mockReturnValue({
      //@ts-ignore
      data:{
        ok:true,
        uid:'123456789',
        name:'Test User',
        token:'ALGUN-TOKEN'
      }
    })

    await act(async()=>{
     await result.current.startRegister(newUser)
    })

    const {errorMessage,status,user} = result.current
    expect({errorMessage,status,user}).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '123456789' }
    }) 
    //destruye el espia para seguir ejecutando la funcion del mock con normalidad
    spy.mockRestore()

  })

  test('startRegister debe fallar la creación', async() => {
    const mockStore=getMockStore({...notAuthenticatedState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    await act(async()=>{
     await result.current.startRegister(testUserCredentials)
    })

    const {errorMessage,status,user} = result.current
    expect({errorMessage,status,user}).toEqual({
      errorMessage: 'Un usuario existe con ese correo',
      status: 'not-authenticated',
      user: {  }
    }) 

  })

  test('checkAuthToken debe fallar si no hay token', async() => {
    const mockStore=getMockStore({...initialState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    await act(async()=>{
      await result.current.checkAuthToken()
     })

     const {errorMessage,status,user} = result.current
     expect({errorMessage,status,user}).toEqual({
      errorMessage:undefined,
      status:'not-authenticated',
      user:{}
    })
  })

  test('checkAuthToken debe autenticar al usuario si hay un token',async () => {
    const {data}=await calendarApi.post('/auth',testUserCredentials)
    localStorage.setItem('token',data.token)

    const mockStore=getMockStore({...initialState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    await act(async()=>{
      await result.current.checkAuthToken()
     })

     const {errorMessage,status,user} = result.current

     expect({errorMessage,status,user}).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '6446a820f93d19a1e8b9828f' }
    })   
  })

  test('startLogout debe realizar el logout', () => {
    const mockStore=getMockStore({...authenticatedState})
    const {result}= renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })
    act(()=>{
      result.current.startLogout()
    })
    expect(result.current).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
      startLogin:expect.any(Function),
      startRegister:expect.any(Function),
      checkAuthToken:expect.any(Function),
      startLogout:expect.any(Function),

    })
  })
  
  
  
  
})