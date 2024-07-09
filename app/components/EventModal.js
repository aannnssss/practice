'use client';
import React, { useState, useEffect } from 'react';

const EventModal = ({ event, onSave, onClose }) => {
    const [organizer, setOrganizer] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        if (event) {
            setOrganizer(event.organizer);
            setDescription(event.description);
            setStartTime(event.start);
            setEndTime(event.end);
            setLocation(event.location);
        }
    }, [event]);

    const handleSave = () => {
        onSave({
            organizer,
            description,
            start: startTime,
            end: endTime,
            location,
        });
        onClose();
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{event ? 'Редактировать мероприятие' : 'Создать мероприятие'}</h3>
                            <div className="mt-2">
                                <div className="mb-4">
                                    <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">Организатор</label>
                                    <input type="text" id="organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
                                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Время начала</label>
                                    <input type="text" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Время окончания</label>
                                    <input type="text" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Место проведения</label>
                                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSave}>Сохранить</button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>Отменить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
