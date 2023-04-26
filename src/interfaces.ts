export interface Event{
  id?:string
  title:string
  notes:string
  start:Date
  end:Date
  bgColor?:string
  user?:User
}

export interface User{
  uid:string
  name:string
}