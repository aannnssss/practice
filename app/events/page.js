'use client';
import React, { useState, useEffect } from 'react';
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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Events() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await fetch(`${apiUrl}/events`);
        const data = await response.json();
        setEvents(data);
    };

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setShowModal(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleEventDelete = async (eventToDelete) => {
        await fetch(`${apiUrl}/events/${eventToDelete.id}`, {
            method: 'DELETE'
        });
        fetchEvents();
    };

    const handleEventSave = async (eventData) => {
        if (selectedEvent) {
            await fetch(`${apiUrl}/events/${selectedEvent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            });
        } else {
            await fetch(`${apiUrl}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            });
        }
        fetchEvents();
        setShowModal(false);
    };

    const handleDateClick = (info) => {
        const clickedDate = new Date(info.dateStr);
        const localDate = new Date(clickedDate.getTime() - clickedDate.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10);
        router.push(`/events/${localDate}`);
    };

    return (
        <div>
            <nav className="flex just-between mb-12 border-b border-violet-100 p-4"></nav>
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
                                right: 'today',
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
                                list: 'Список',
                            }}
                            nowIndicator={true}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                        />
                    </div>
                </div>
            </main>

            {showModal && (
                <EventModal onSave={handleEventSave} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
