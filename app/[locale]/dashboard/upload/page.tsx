'use client'
import React, { useState } from 'react';
import { getActivityLogs, getAlerts, getAnalysisResults, getDashboardData } from '@/src/api';
import VideoUpload from '@/src/features/dashboard/component/videoupload';

const App: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [dashboardData, setDashboardData] = useState<any[]>([]);

    const handleUpload = async (data: any) => {
        setResults(await getAnalysisResults(data));
        setAlerts(await getAlerts());
        setLogs(await getActivityLogs());
        setDashboardData(await getDashboardData());
    };

    return (
        <div className="App">
            <VideoUpload onUpload={handleUpload} />
        </div>
    );
};

export default App;
