import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithAciveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';
describe('Pruebas en calendarSlice', () => { 
  test('debe de regresar el estado por defecto', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })

  test('onSetActiveEvent debe activar el evento', () => {
    const state= calendarSlice.reducer(calendarWithEventsState,onSetActiveEvent(events[0]))

    expect(state.activeEvent).toEqual(calendarWithAciveEventState.activeEvent)
  })

  test('onAddNewEvent debe agregar el evento', () => {
    const newEvent={
      id:'3',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title:'Cumpleaños de Fernando!!!',
      notes:'Alguna nota!!!'
    }

    const state= calendarSlice.reducer(calendarWithEventsState,onAddNewEvent(newEvent))

    expect(state.events).toEqual([...events,newEvent])
    expect(state.events.length).toBe(3)
  })

  test('onUpdateEvent debe actualizar el evento', () => {

    const newEvent={
      id:'1',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title:'Cumpleaños de Fernando actualizado',
      notes:'Alguna nota actualizada'
    }

    const state= calendarSlice.reducer(calendarWithEventsState,onUpdateEvent(newEvent))

    expect(state.events).toContain(newEvent)
  })

  test('onDeleteEvent debe borrar el evento activo', () => {
    // calendarWithAciveEventState
    const state= calendarSlice.reducer(calendarWithEventsState,onSetActiveEvent(events[0]))

    const newState=calendarSlice.reducer(state,onDeleteEvent())
    expect(newState.events.length).toBe(1)
    expect(newState.events).not.toContain(events[0])
    expect(newState.activeEvent).toBe(null)
  })

  test('onLoadEvents debe establecer los eventos', () => {
    // initialState
    const state= calendarSlice.reducer(initialState,onLoadEvents(events))
    expect(state).toEqual(calendarWithEventsState)
    expect(state.isLoadingEvents).toBeFalsy()
    
    const newState= calendarSlice.reducer(state,onLoadEvents(events))
    expect(newState.events.length).toBe(events.length)
  })
  
  test('onLogoutCalendar debe limpiar  el estado', () => {
    // calendarWithAciveEventState
    const state= calendarSlice.reducer(calendarWithAciveEventState,onLogoutCalendar())
    expect(state).toEqual(initialState)
  })
  
  
  
})