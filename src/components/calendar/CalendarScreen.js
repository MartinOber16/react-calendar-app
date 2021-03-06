import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Cambio el idioma
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';
moment.locale('es');

const localizer = momentLocalizer( moment );

// const events = [{
//     title:'Cumpleaños del jefe',
//     start: moment().toDate(), //new Date()
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Martin',
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [ dispatch ]);

    const onDoubleClick = (e) => {
        //console.log(e);
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        //console.log(e);
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) => {
        //console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        //console.log(e);
        dispatch( eventClearActive() );
    }


    const eventStyleGetter = ( event, start, end, isSelected ) => {

        // console.log('uid: ', uid);
        // console.log('event: ', event);
        // console.log('start: ', start);
        // console.log('end: ', end);
        // console.log('isSelected: ', isSelected)
        const userEvent = event.user._id || event.user;

        const style = {
            backgroundColor: ( uid === userEvent ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            { ( activeEvent ) && <DeleteEventFab /> }
    
            <CalendarModal />

        </div>
    )
}
