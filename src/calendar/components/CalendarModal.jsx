import { useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";
import Modal from "react-modal";
import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert2/dist/sweetalert2.min.css'

import { useCalendarStore, useUiStore } from '../../hooks'

registerLocale('es', es);

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

    const [formSubmited, setFormSubmited] = useState(false);
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { eventActive, startSavingEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleValid = useMemo(() => {
        if(!formSubmited) return '';

        return (formValues.title.length > 0) 
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmited])

    useEffect(() => {
        if( eventActive !== null ) {
            setFormValues({...eventActive});
        }
    }, [eventActive]);

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    };

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmited(true);

        const differenceDates = differenceInSeconds(formValues.end, formValues.start);
        
        if( isNaN(differenceDates) || differenceDates <= 0 ) {
            Swal.fire('Error!', 'The dates are incorrect.', 'error');
            return;
        }

        await startSavingEvent(formValues);
        onCloseModal();
        setFormSubmited(false);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />

            <form className="container" onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={formValues.start} 
                        className="form-control" 
                        onChange={ (event) => onDateChange(event, 'start')} 
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                        />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end} 
                        className="form-control" 
                        onChange={ (event) => onDateChange(event, 'end')} 
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                        />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleValid}`}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripci??n corta
                    </small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Informaci??n adicional
                    </small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
