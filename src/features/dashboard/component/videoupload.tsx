import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface VideoUploadProps {
    onUpload: (data: any) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setUploadProgress(null); // Reset progress when a new file is selected
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await axios.post('http://localhost:8080/footage/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    if (total !== undefined) {
                        const percentage = Math.floor((loaded * 100) / total);
                        setUploadProgress(percentage < 100 ? percentage : 99); // Keep at 99% until server response
                    }

                },
            });
            setUploadProgress(100);
            onUpload(file);
            console.log("file response is ")
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
                <input
                    type="file"
                    accept="*/*"
                    onChange={handleFileChange}
                    className="mb-4 w-full"
                    disabled={uploading}
                />
                <button
                    onClick={handleUpload}
                    className={`w-full py-2 rounded-lg text-white ${uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
                    disabled={!file || uploading}
                >
                    {uploading ? 'Uploading....' : 'Upload'}
                </button>
                {uploadProgress !== null && (
                    <div className="mt-4 w-full">
                        <div className="bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-500 h-4 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-center text-sm font-semibold mt-2">{uploadProgress}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoUpload;
