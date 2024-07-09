'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Events_selection from '../components/Events_selection';
import './events.css';
import Header from '../components/Header';
import EventModal from '../components/EventModal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru';

export default function Events() {
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem('events');
        return storedEvents ? JSON.parse(storedEvents) : [];
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const router = useRouter();

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setShowModal(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleEventDelete = (eventToDelete) => {
        const updatedEvents = events.filter((e) => e !== eventToDelete);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const handleDateClick = (info) => {
        const clickedDate = info.date.toISOString().slice(0, 10);
        router.push(`/events/${clickedDate}`);
    };

    return (
        <div>
        <nav className="flex just-between mb-12 border-b border-violet-100 p-4">
        </nav>
        <main>
            <Events_selection />
            <Header text="Календарь мероприятий" />
            <div className="flex justify-end">
            <div>
                <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev next',
                    center: 'title',
                    right: 'today'
                }}
                events={events}
                locale={ruLocale}
                firstDay={1}
                initialView="dayGridMonth"
                buttonText={{
                    today: 'Сегодня',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                    list: 'Список'
                }}
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick={handleDateClick}
                />
            </div>
            </div>
        </main>

        {showModal && (
            <EventModal
            onSave={handleEventSave}
            onClose={() => setShowModal(false)}
            />
        )}
        </div>
    );
}
