import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { useEffect, useState } from 'react';
import { CalendarEventBox, CalendarModal, FabButton, FabButtonDelete, Navbar } from '../components';
import { localizer, getMessagesES } from '../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, onSelectEventActive, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id || user.uid === event.user.uid);


    const style = {
      'backgroundColor': isMyEvent ? '#347CF7' : '#465660',
      'border': '2px',
      'borderRadius': '0',
      'color': '#FFFFFF'
    };

    return {
      style
    }
  }

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const onSelectEvent = (event) => {
    onSelectEventActive(event);
  }
  
  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])  

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        culture='es'
        startAccessor="start"
        endAccessor="end"
        messages={getMessagesES()}
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        components={{
          event: CalendarEventBox
        }}
      />

      <CalendarModal/>
      <FabButton/>
      <FabButtonDelete/>
    </>
  );
};
