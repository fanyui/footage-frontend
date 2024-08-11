'use client'
import { getAnalysisResults } from '@/src/api';
import React, { useEffect, useState } from 'react'

export default function Page({ params }: { params: { slug: string } }) {
    const [statistics, setStatistics] = useState(null); // Set initial state to null
    const [selectedEvent, setSelectedEvent] = useState(null); // Set initial state to null

    function convertTimeToSeconds(timeString: string) {
        let t = timeString.split(':');
        let seconds = 0
        let hours = 0;
        let minutes = 0
        if (t.length == 1) {
            return parseInt(t[0])
        }
        if (t.length > 2) {
            hours = parseInt(t[0])
            minutes = parseInt(t[1])
            seconds = parseInt(t[2])
        }
        else {
            minutes = parseInt(t[0])
            seconds = parseInt(t[1])
        }
        console.log("s", seconds, "m", minutes, "h", hours)
        return hours * 3600 + minutes * 60 + seconds;
    }
    const handleEventClick = (event) => {
        console.log("selected", event);
        setSelectedEvent(event);
        let video = document.getElementById('footage-player')
        const time = convertTimeToSeconds(event.eventStartTime)
        console.log("time", time)
        video.currentTime = time
        // Add logic to jump to the video segment if needed
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnalysisResults(params.slug);
                console.log("finding", result);
                setStatistics(result);
                if (result && result.detectedEvents && result.detectedEvents.length > 0) {
                    setSelectedEvent(result.detectedEvents[0]);
                }
            } catch (error) {
                console.error("Error fetching analysis results:", error);
            }
        };
        fetchData();
    }, [params.slug]);

    console.log("details", statistics);

    if (!statistics) {
        return <p>Loading...</p>; // Display a loading message while data is being fetched
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Event Review and Analysis</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Event Timeline */}
                        <div className="col-span-1 lg:col-span-1 bg-gray-50 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Detected Events</h2>
                            <ul className="space-y-4">
                                {statistics.detectedEvents.map((event, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleEventClick(event)}
                                        className={`cursor-pointer p-2 rounded-lg ${selectedEvent === event ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                                    >
                                        <div className="text-sm font-medium text-gray-700">{event.eventStartTime}</div>
                                        <div className="text-sm text-gray-500">{event.eventType}</div>
                                        <div className="ml-4 mt-2">
                                            <h3 className="text-sm font-semibold text-gray-600">Suspects:</h3>
                                            <ul className="space-y-1">
                                                {event.suspects?.map((suspect, sIndex) => (
                                                    <li key={sIndex} className="text-sm text-gray-600">
                                                        <div>Appearance: {suspect.appearance}</div>
                                                        <div>Behavior: {suspect.behavior}</div>
                                                        <div>Confidence: {suspect.confidence}%</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Video Playback and Event Details */}
                        <div className="col-span-1 lg:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Video Playback</h2>
                            {statistics?.videoPath ? (
                                <video id='footage-player' controls src={`http://localhost:8080/` + statistics.videoPath} className="w-full mb-4"></video>
                            ) : (
                                <p className="text-gray-500">No video available for this event.</p>
                            )}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Event Details</h2>
                            {selectedEvent ? (
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-700">Type: {selectedEvent.eventType}</div>
                                    <div className="text-sm font-medium text-gray-700">Severity: {selectedEvent.severity}</div>
                                    <div className="text-sm font-medium text-gray-700">Confidence: {selectedEvent.confidence}%</div>
                                    <div className="text-sm font-medium text-gray-700">Description: {selectedEvent.description}</div>
                                    <div className="mt-4 flex space-x-4">
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Mark as Reviewed</button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Escalate</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">No event selected.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
