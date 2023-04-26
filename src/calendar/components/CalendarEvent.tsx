
interface user{
  name:string
  id:string
}

// interface event{
//   title:string
//   user:any
// }

interface Props {
  event:any
  continuesAfter:boolean
  continuesPrior:boolean
}

export const CalendarEvent = (props: Props) => {
  const {event}=props
  const {title,user}=event
  
  return (
    <div>
      <strong>{title}</strong>
      <span>- {user.name}</span>
    </div>
  )
}
