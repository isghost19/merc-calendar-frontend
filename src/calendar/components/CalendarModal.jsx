
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal"

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useCalendarHooks } from "../../hooks/useCalendarHooks";
import { useCalendarStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
  
Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { title, notes, start, end, onSubmit, onInputChange, titleClass, onDateChanged} = useCalendarHooks();
  const {isDateModalOpen, closeDateModal} = useUiStore();
  const  {activeEvent, startSavingEvent} = useCalendarStore()
  
 
  return (
    <Modal 
    isOpen={ isDateModalOpen }
    onRequestClose={closeDateModal}
    style={customStyles}
    className='modal'
    overlayClassName="modal-fondo"
    closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
    <hr />
    <form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker 
          selected={start}
          onChange={(event) => onDateChanged(event, 'start') }
          className="form-control"
          dateFormat='Pp'
          showTimeSelect
          locale="es"
          timeCaption="hora"
        />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker 
        minDate={start}
          selected={end}
          onChange={(event) => onDateChanged(event, 'end') }
          className="form-control"
          dateFormat='Pp'
          showTimeSelect
          locale="es"
          timeCaption="hora"
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={onInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={onInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

    </form>
    </Modal>
  )
}
