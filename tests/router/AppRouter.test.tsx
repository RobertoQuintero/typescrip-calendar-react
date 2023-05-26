import React from 'react'
import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar/pages/CalendarPage';

jest.mock("../../src/hooks/useAuthStore")
jest.mock('../../src/calendar/pages/CalendarPage',()=>({
  CalendarPage:()=><h1>CalendarPage</h1>
}))


describe('Pruebas en AppRouter', () => { 
  const mockCheckAuthToken=jest.fn()
  beforeEach(()=>jest.clearAllMocks())

  test('debe mostrar la pantalla de carga y llamar checkAuthToken', () => {
    //@ts-ignore
    useAuthStore.mockReturnValue({
      status:'checking',
      checkAuthToken:mockCheckAuthToken
    })

    render(<AppRouter/>)
    expect(screen.getByText('Cargando')).toBeTruthy()
    expect(mockCheckAuthToken).toHaveBeenCalled()
  })

  test('debe mostrar el login en caso de no estar autenticado', () => {
    //@ts-ignore
    useAuthStore.mockReturnValue({
      status:'not-authenticated',
      checkAuthToken:mockCheckAuthToken
    })
    
    const {container}=render(
      <MemoryRouter initialEntries={['/auth2/algo/sdsdsdsd']}>
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
      <MemoryRouter initialEntries={['/auth2/algo/sdsdsdsd']}>
        <AppRouter/>
      </MemoryRouter>
    )
    expect(screen.getByText('CalendarPage')).toBeTruthy()
  })

  
})