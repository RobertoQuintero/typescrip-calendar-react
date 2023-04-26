import { useDispatch } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, useAppSelector } from "../store"
import { Event } from "../interfaces"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
  const dispatch= useDispatch()
const {events,activeEvent} = useAppSelector(state=>state.calendar)
const {user} = useAppSelector(state=>state.auth)

const setActiveEvent=(calendarEvent:Event)=>{
  dispatch(onSetActiveEvent(calendarEvent))
}

const startSavingEvent=async(calendarEvent:Event)=>{
  //llegar al backend

try {
  
  if(calendarEvent.id){
    await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent)
    dispatch(onUpdateEvent({...calendarEvent,user}))
    return
  }
    const {data}=await calendarApi.post('/events',calendarEvent)
    console.log(data)
    dispatch(onAddNewEvent({...calendarEvent,id:data.evento.id,user}))
} catch (error:any) {
  console.log(error)
  Swal.fire('Error al guardar',error.response.data.msg,'error')
}

}

const startDeletingEvent=async()=>{
  try {
    await calendarApi.delete(`/events/${activeEvent?.id}`)
    dispatch(onDeleteEvent())
  } catch (error:any) {
    console.log(error)
    Swal.fire('Error al borrar',error.response.data.msg,'error')
    
  }

}

const startLoadingEvents=async()=>{

  try {
    const  {data}  = await calendarApi.get('/events')
    const events = convertEventsToDateEvents(data.eventos)
    dispatch(onLoadEvents(events))
  } catch (error) {
    console.log(error)
  }

}

return {
  //propiedades
  events,
  activeEvent,
  hasEventSelected:!!activeEvent,

  //metodos
  setActiveEvent,
  startSavingEvent,
  startDeletingEvent,
  startLoadingEvents
}
  
}
