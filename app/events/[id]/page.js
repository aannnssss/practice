'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EventModal from '../../components/EventModal';
import Events_selection from '../../components/Events_selection';
import Header from '../../components/Header';
import './day.css';

export default function EventDetails() {
    const router = useRouter();
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        const allEvents = storedEvents ? JSON.parse(storedEvents) : [];
        const filteredEvents = allEvents.filter(event => event.date === id);
        setEvents(filteredEvents);
    }, [id]);

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setShowModal(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleEventDelete = (eventToDelete) => {
        const storedEvents = localStorage.getItem('events');
        const allEvents = storedEvents ? JSON.parse(storedEvents) : [];
        const updatedEvents = allEvents.filter((e) => e !== eventToDelete);
        setEvents(updatedEvents.filter(event => event.date === id));
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const handleEventSave = (eventData) => {
        const storedEvents = localStorage.getItem('events');
        const allEvents = storedEvents ? JSON.parse(storedEvents) : [];
        const updatedEvents = selectedEvent
            ? allEvents.map((e) => (e === selectedEvent ? { ...eventData, date: id } : e))
            : [...allEvents, { ...eventData, date: id }];
        setEvents(updatedEvents.filter(event => event.date === id));
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setShowModal(false);
    };

    return (
        <div className="event-details-container">
            <Header text="Календарь мероприятий" />
            
            <h2 className="event-details-date">{id}</h2>
            <div className="events-list">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index} className="event-card">
                            <h3>{event.organizer}</h3>
                            <p>{event.description}</p>
                            <p>Start: {event.start}</p>
                            <p>End: {event.end}</p>
                            <p>Location: {event.location}</p>
                            <button onClick={() => handleEventClick(event)}>Редактировать</button>
                            <button onClick={() => handleEventDelete(event)}>Удалить</button>
                        </div>
                    ))
                ) : (
                    <p className="no-events">На эту дату нет мероприятий.</p>
                )}
            </div>
            <button className="create-button" onClick={handleCreateEvent}>Создать</button>

            {showModal && (
                <EventModal
                    event={selectedEvent}
                    onSave={handleEventSave}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}