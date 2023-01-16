import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEvents } from "../helpers";
import { onAddEventToList, onDeleteEvent, onLoadEvents, onSetEventActive, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { events, eventActive } = useSelector(state => state.calendar);

    const onSelectEventActive = ( calendar_event ) => {
        dispatch( onSetEventActive( calendar_event ) );
    }

    const startSavingEvent = async (calendar_event) => {
        try {
            if(calendar_event.id) {
                await calendarApi.put(`/events/${calendar_event.id}`, calendar_event);
                dispatch(onUpdateEvent({...calendar_event, user}));
                return;
            }
            
            const { data } = await calendarApi.post('/events', calendar_event);
            dispatch(onAddEventToList({...calendar_event, id: data.event.id, user}));            
        } catch (error) {
            Swal.fire('Error', error.response.data.message, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEvents(data.events);
            dispatch(onLoadEvents(events));
        } catch (error) {
            Swal.fire('Error', error.response.data.message, 'error');
        }
    }

    const startDeletingEvent = async () => {
        try {
            const { data } = await calendarApi.delete(`events/${eventActive.id}`);
            Swal.fire('Event deleted', data.message, 'info');
            dispatch(onDeleteEvent());
        } catch (error) {
            Swal.fire('Error', error.response.data.message, 'error');
        }
    }

    return {
        events,
        eventActive,
        hasEventActive: !!eventActive,
        onSelectEventActive,
        startSavingEvent,
        startLoadingEvents,
        startDeletingEvent
    }
}