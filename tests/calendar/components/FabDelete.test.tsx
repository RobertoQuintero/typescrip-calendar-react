import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';


jest.mock('../../../src/hooks/useCalendarStore')
 
describe('Pruebas en FabDelete', () => { 
  const mockStartDeletingEvent=jest.fn()

  beforeEach(()=>jest.clearAllMocks())
  // beforeEach(()=>jest.clearAllTimers())

  test('debe mostrar el componente correctamene', () => {
    //@ts-ignore
    useCalendarStore.mockReturnValue({
      hasEventSelected:false
    })
    render(<FabDelete/>)
    
    const btn =screen.getByLabelText('btn-delete')
    expect(btn.classList).toContain('btn')
    expect(btn.classList).toContain('btn-danger')
    expect(btn.classList).toContain('fab-danger')
    expect(btn.style.display).toBe('none')
  })

  test('debe mostrar el botón si hay un evento activo', () => {
    //@ts-ignore
    useCalendarStore.mockReturnValue({
      hasEventSelected:true
    })
    render(<FabDelete/>)
    
    const btn =screen.getByLabelText('btn-delete')
    expect(btn.style.display).toBe('')
    
  })

  test('debe llamar startDeletingEvent si hay evento activo', () => {
    //@ts-ignore
    useCalendarStore.mockReturnValue({
      hasEventSelected:true,
      startDeletingEvent:mockStartDeletingEvent
    })
    render(<FabDelete/>)
    
    const btn =screen.getByLabelText('btn-delete')
    fireEvent.click(btn)

    expect(mockStartDeletingEvent).toHaveBeenCalled()

  })
  
})