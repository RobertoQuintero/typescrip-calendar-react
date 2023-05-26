import { onLoadEvents } from '../../../src/store/calendar/calendarSlice';
import { onLogoutCalendar } from '../../../src/store/calendar/calendarSlice';
import { calendarSlice, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithAciveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';
describe('Pruebs en calendarSlice', () => { 
  test('debe regresar el estado por defecto', () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState)
  })

  test('onSetActiveEvent debe activar el evento', () => {
    const state= calendarSlice.reducer(calendarWithEventsState,onSetActiveEvent(events[0]))

    expect(state).toEqual(calendarWithAciveEventState)
  })

  test('onAddNewEvent debe agreagr el nuevo evento', () => {
    const newEvent={
      id:'3',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title:'Cumpleaños de Carlos',
      notes:'Alguna nota #3'
    }

    const  state= calendarSlice.reducer(calendarWithEventsState,onAddNewEvent(newEvent))

    expect(state.events[2]).toEqual(newEvent)
    expect(state.events).toEqual([...events,newEvent])
  })

  test('onUpdateEvent debe actualizar el evento', () => {
    const updatedEvent={
      id:'1',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title:'Cumpleaños de Carlos',
      notes:'Alguna nota #3'
    }

    const  state= calendarSlice.reducer(calendarWithEventsState,onUpdateEvent(updatedEvent))

    expect(state.events).toContain(updatedEvent)
  })

  test('onDeleteEvent debe borrar el evento activo', () => {
    const state= calendarSlice.reducer(calendarWithAciveEventState,onDeleteEvent)
    
    expect(state.activeEvent).toBe(null)
    expect(state.events).not.toContain(events[0])
  })

  test('onLoadEvents debe establecer los eventos', () => {
    const state= calendarSlice.reducer(initialState,onLoadEvents(events))
    expect(state.events).toEqual(events)
    expect(state.isLoadingEvents).toBeFalsy()
    
    const newState= calendarSlice.reducer(state,onLoadEvents(events))
    expect(newState).toEqual(state)
    expect(newState.events.length).toBe(events.length)
  })
  
  test('onLogoutCalendar debe limpiar el estado', () => {
    const state= calendarSlice.reducer(calendarWithAciveEventState,onLogoutCalendar)

    expect(state).toEqual(initialState)
    
  })
  
  
  
})