import { createSlice } from '@reduxjs/toolkit';
import { Event } from '../../interfaces';

// const tempEvent={
//   id:new Date().getTime().toString(),
//   title:'Cumpleaños del jefe',
//   notes:'Hay que comprar el pastel',
//   start:new Date(),
//   end:addHours(new Date(),2),
//   bgColor:'#fafafa',
//   user:{
//     id:'123',
//     name:'Roberto'
//   }
// }

interface CalendarState{
  isLoadingEvents:boolean
  events:Event[]
  activeEvent: null| Event
}

const initialState:CalendarState={
  isLoadingEvents:true,
  events:[
    // tempEvent
  ],
  activeEvent:null,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state,{payload} ) => {
            state.activeEvent=payload
        },
        onAddNewEvent: (state,{payload} ) => {
            state.events.push(payload)
            state.activeEvent=null
        },
        onUpdateEvent: (state,{payload} ) => {
            state.events=state.events.map(event=>{
              if(event.id===payload.id){
                return payload
              }
              return event
            })
        },
        onDeleteEvent: (state ) => {
          if(state.activeEvent){
            state.events=state.events.filter(event=>event.id!==state.activeEvent?.id)
            state.activeEvent=null

          }
        },
        onLoadEvents: (state,{payload=[]} ) => {
          state.isLoadingEvents=false
          payload.forEach((event:any)=>{
            const exists=state.events.some((dbEvent:any)=>dbEvent.id===event.id)
            if(!exists){
              state.events.push(event)
            }
          })
        },
        onLogoutCalendar: (state) => {
          state.isLoadingEvents=true
          state.events=[]
          state.activeEvent=null
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent ,onAddNewEvent,onUpdateEvent,onDeleteEvent,onLoadEvents,onLogoutCalendar} = calendarSlice.actions;
