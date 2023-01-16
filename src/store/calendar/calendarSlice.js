import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        eventActive: null
    },
    reducers: {
        onSetEventActive: (state, {payload}) => {
            state.eventActive = payload;
        },
        onAddEventToList: (state, {payload}) => {
            state.events.push(payload);
            state.eventActive = null;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( event => {
                if( event.id === payload.id ) return payload
                return event
            })
            state.eventActive = null;
        }, 
        onDeleteEvent: (state) => {
            if(state.eventActive) {
                state.events = state.events.filter( event => event.id !== state.eventActive.id);
                state.eventActive = null;
            }
        },
        onLoadEvents: (state, {payload}) => {
            state.isLoadingEvents = false;
            payload.forEach( event => {
                const exist = state.events.some( dbEvent => dbEvent.id === event.id);
                if(!exist) state.events.push(event);
            })
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.eventActive = null;
        }
    }
});

export const { events, eventActive, onSetEventActive, onAddEventToList, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;