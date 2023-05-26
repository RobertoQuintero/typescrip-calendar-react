import { onCloseDateModal } from '../../../src/store/ui/uiSlice';
import { onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';
describe('Pruebas en uiSlice', () => { 
  test('debe regresar le estado por defecto', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
  })

  test('debe cambiar el isDateModalOpen correctamente', () => {
    let state= uiSlice.getInitialState()
    state=uiSlice.reducer(state,onOpenDateModal())
    expect(state.isDateModalOpen).toBeTruthy()
    state=uiSlice.reducer(state,onCloseDateModal())
    expect(state.isDateModalOpen).toBeFalsy()
  })
  
})