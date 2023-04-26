import React from 'react'
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store"
import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks"
import { Provider } from 'react-redux';

const getMockStore=(initialState)=>{
  return configureStore({
    reducer:{
      ui:uiSlice.reducer
    },
    preloadedState:{
      ui:{...initialState}
    }
  })
}

describe('Pruebas en useUiStore', () => { 

  test('debe regresar los valores por defecto', () => {
    const mockStore=getMockStore({isDateModalOpen:false})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function)
    })
  })

  test('openDateModal debe colocar true en el isDateModalOpen', () => {
    const mockStore=getMockStore({isDateModalOpen:false})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    const {openDateModal}= result.current

    act(()=>{
      openDateModal()
    })

    // console.log({result:result.current,isDateModalOpen})
    expect(result.current.isDateModalOpen).toBeTruthy()
    
  })

  test('closeDateModal debe colocar en false el isDateModalOpen', () => {
    const mockStore=getMockStore({isDateModalOpen:true})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    const {closeDateModal}= result.current

    act(()=>{
      closeDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()
  })


  test('toggleDateModal debe cambiar el valor de isDateModalOpen a false y true', () => {

    const mockStore=getMockStore({isDateModalOpen:true})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    // const {toggleDateModal}= result.current

    act(()=>{
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()

    act(()=>{
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
    
  })
  
  
  
  

})