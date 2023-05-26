import React from 'react'

import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks"
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store"
import { Provider } from "react-redux"
import { store } from '../../src/store/store';

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
    const mockStore= getMockStore({isDateModalOpen:false})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function)
    }
)
  })

  test('openDateModal debe colocar true en el isDateModalOPen', () => {
    const mockStore= getMockStore({isDateModalOpen:false})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    act(()=>{
      result.current.openDateModal()
    })

    expect(result.current.isDateModalOpen).toBe(true)
  })

  test('closeDateModal debe cerrar el modal', () => {
    const mockStore= getMockStore({isDateModalOpen:true})
    const {result}=renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })
    act(()=>{
      result.current.closeDateModal()
    })
    expect(result.current.isDateModalOpen).toBeFalsy()
  })

  test('toggleDateModal debe establecer el estado contrario que hay en el isDateModalOpen', () => {
    const mockStore= getMockStore({isDateModalOpen:true})
    const {result}= renderHook(()=>useUiStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

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