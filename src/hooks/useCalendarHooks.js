import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useCalendarStore } from "./useCalendarStore";
import { uiSlice } from "../store";
import { useUiStore } from "./useUiStore";

export const useCalendarHooks = () => {
  const {activeEvent, startSavingEvent} = useCalendarStore();
  const {closeDateModal} = useUiStore();

  const [IsOpen, setIsOpen] = useState(true);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2),
  });

  useEffect(() => {
    if(activeEvent !== null) {
        setFormValues({...activeEvent})
    }
  }, [activeEvent])

  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    console.log('cerando modal')
    setIsOpen( false );
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds( formValues.end, formValues.start );
    if( isNaN(difference) || difference <= 0) {
      Swal.fire('fechas incorrectas', 'revisar las fechas ingresadas', 'error');
      return;
    }
    if (formValues.title.length <= 0) return;

    console.log(formValues);

    await startSavingEvent( formValues );
    closeDateModal();
    setFormSubmitted(false);

  }

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return ( formValues.title.length > 0 )
      ? ''
      : 'is-invalid';
  }, [formValues.title, formSubmitted])
  
  
  return {
      onSubmit,
      onCloseModal,
      onDateChanged,
      onInputChange,
      title: formValues.title,
      notes: formValues.notes,
      start: formValues.start,
      end: formValues.end,
      IsOpen,
      titleClass
  }
}
