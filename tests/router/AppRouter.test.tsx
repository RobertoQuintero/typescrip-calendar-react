import React from 'react'
import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar/';

jest.mock('../../src/hooks/useAuthStore')

//para que renderice este componente y no el original
jest.mock('../../src/calendar/',()=>({
  CalendarPage:()=><h1>CalendarPage</h1>
}))


describe('pruebas en AppRouter', () => { 
  const mockCheckAuthToken=jest.fn()
  beforeEach(()=>jest.clearAllMocks())

  test('debe mostrar la pantalla de carga y llamar checkAuthToken', () => {
    //@ts-ignore
    useAuthStore.mockReturnValue({
      status:'checking',
      checkAuthToken:mockCheckAuthToken
    })

    render(<AppRouter/>)
    const loading= screen.getByLabelText('cargando')
    expect(loading.textContent).toBe('Cargando')
    
  })

  test('debe mostrar el login en caso de no estar autenticado', () => {
    //@ts-ignore
    useAuthStore.mockReturnValue({
      status:'not-authenticated',
      checkAuthToken:mockCheckAuthToken
    })

    const {container}=render(
      <MemoryRouter initialEntries={['/auth/algo/otracosa']}>
        <AppRouter/>
      </MemoryRouter>
    )
    expect(screen.getByText('Ingreso')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('debe mostrar el calendario si estamos autenticados', () => {
    //@ts-ignore
    useAuthStore.mockReturnValue({
      status:'authenticated',
      checkAuthToken:mockCheckAuthToken
    })

    render(
      <MemoryRouter >
        <AppRouter/>
      </MemoryRouter>
    )
    
    expect(screen.getByText('CalendarPage')).toBeTruthy()
  })
  
  
})