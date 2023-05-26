import { checking } from '../../../src/store/auth/authSlice';
import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState, notAuthenticatedState } from '../../fixtures/authStates';
describe('Pruebas en authSlice', () => { 
  
  test('debe regresar el estado inicial', () => {
      expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('debe realizar el login y cambiar el estado', () => {
    const state= authSlice.reducer(initialState,onLogin(authenticatedState.user))

    expect(state).toEqual(authenticatedState)
  })

  test('debe realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState,onLogout)

    expect(state).toEqual(notAuthenticatedState)
  })

  test('debe realizar el logout con msj de error', () => {
    const errorMsg='credenciales no validas'
    const state = authSlice.reducer(authenticatedState,onLogout(errorMsg))

    expect(state.errorMessage).toEqual(errorMsg)
  })

  test('debe limpiar el mensaje de error', () => {
    const errorMsg='credenciales no validas'
    const state = authSlice.reducer(authenticatedState,onLogout(errorMsg))
    const newState = authSlice.reducer(authenticatedState,clearErrorMessage)
    
    expect(newState.errorMessage).toBe(undefined)
  })

  test('debe ejecutar el onChecking', () => {
    
    const state = authSlice.reducer(authenticatedState,checking)
    
    expect(state.status).toBe('checking')
    
  })
  
  
  
})