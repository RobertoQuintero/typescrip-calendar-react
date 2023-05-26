import {   useDispatch,  } from "react-redux"
import {  onCloseDateModal, onOpenDateModal, useAppSelector } from "../store";

export const useUiStore = () => {
  const dispatch= useDispatch()
  const {
    isDateModalOpen
  } = useAppSelector(state=>state.ui)

  const openDateModal=()=>{
    dispatch(onOpenDateModal())
  }

  const closeDateModal=()=>{
    dispatch(onCloseDateModal())
  }

  const toggleDateModal=()=>{
    !isDateModalOpen
      ?openDateModal()
      :closeDateModal()
  }

  return{
    //propiedades
    isDateModalOpen,


    //metodos
    openDateModal,
    closeDateModal,
    toggleDateModal

  }

}
