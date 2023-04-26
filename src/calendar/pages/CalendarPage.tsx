import {Calendar, View,} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { getMessagesES, localizer } from '../../helpers'
import {   useEffect, useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'
import { Event } from '../../interfaces'


export const CalendarPage = () => {
  const {user}=useAuthStore()
  const {openDateModal}=useUiStore()
  const {events,setActiveEvent,startLoadingEvents}=useCalendarStore()

  const [lastView, setLastView] = useState<View | undefined>((localStorage.getItem('lastView') || 'week') as View) 

  const eventStyleGetter=(event:Event|any,start:Date,end:Date,isSelected:boolean)=>{
    // console.log(event,start,end,isSelected)
    const isMyEvent=(user.uid === event.user._id)||(user.uid===event.user.uid)

    const style={
      backgroundColor:isMyEvent?'#347cf7':'#333',
      borderRadius:'0',
      opacity:0.8,
      color:'white'
    }
    return {style}
  }

  const onDoubleClick=(event:Event|any)=>{
    openDateModal()
  }
  const onSelect=(event:Event|any)=>{
    setActiveEvent(event)
  }
  const onViewChanged=(event:Event|any)=>{
    // console.log({viewChanged:event})
    localStorage.setItem('lastView',event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
    <Navbar/>
    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event:CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
    <CalendarModal />
    <FabAddNew />
    <FabDelete />
    </>
  )
}



