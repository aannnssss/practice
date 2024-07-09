'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EventModal from '../../components/EventModal';
import Events_selection from '../../components/Events_selection';
import Header from '../../components/Header';
import './day.css';
import { v4 as uuidv4 } from 'uuid'; // Импортируем uuid для создания уникальных идентификаторов
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Импортируем русскую локализацию для date-fns

export default function EventDetails() {
    const router = useRouter();
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, [id]);

    const fetchEvents = async () => {
        const response = await fetch('http://localhost:3001/events');
        const allEvents = await response.json();
        const filteredEvents = allEvents.filter(event => event.date === id);
        setEvents(filteredEvents);
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
        await fetch(`http://localhost:3001/events/${eventToDelete.id}`, {
            method: 'DELETE',
        });
        fetchEvents();
    };

    const handleEventSave = async (eventData) => {
        if (selectedEvent) {
            await fetch(`http://localhost:3001/events/${selectedEvent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...eventData, id: selectedEvent.id, date: id }),
            });
        } else {
            await fetch('http://localhost:3001/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...eventData, id: uuidv4(), date: id }),
            });
        }
        fetchEvents();
        setShowModal(false);
    };

    const handleBackClick = () => {
        router.back();
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, "d MMMM yyyy, EEEE", { locale: ru });
    };

    return (
        <div>
            <nav className="flex justify-between mb-12 border-b border-violet-100 p-4" />
            <main>
                <Events_selection />
                <Header text="Календарь мероприятий" />
                <div className="event-details-container">
                <div className="event-details-content">
                    <h2 className="event-details-date">{formatDate(id)}</h2>
                    <div className="events-list">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                        <div key={index} className="event-card">
                            <p className="event-field">
                            <span>Организатор:</span> {event.organizer}
                            </p>
                            <p className="event-field">
                            <span>Описание:</span> {event.description}
                            </p>
                            <p className="event-field">
                            <span>Начало:</span> {event.start}
                            </p>
                            <p className="event-field">
                            <span>Конец:</span> {event.end}
                            </p>
                            <p className="event-field">
                            <span>Место проведения:</span> {event.location}
                            </p>
                            <div className="button-group">
                            <button onClick={() => handleEventClick(event)}>
                                Редактировать
                            </button>
                            <button onClick={() => handleEventDelete(event)}>
                                Удалить
                            </button>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="no-events">Нет запланированных мероприятий.</p>
                    )}
                    </div>
                    <div className="buttons-container">
                    <button className="back-button" onClick={handleBackClick}>
                        Назад
                    </button>
                    <button className="create-button" onClick={handleCreateEvent}>
                        Создать
                    </button>
                    </div>
                </div>
                </div>
                {showModal && (
                <EventModal
                    event={selectedEvent}
                    onSave={handleEventSave}
                    onClose={() => setShowModal(false)}
                />
                )}
            </main>
        </div>
    );
}
