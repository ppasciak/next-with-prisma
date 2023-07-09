import React, { useEffect, useState } from "react";

type FileDropZoneTypes = {
    onFileChange: (file: File) => void;
    fileValue: File | null;
};

const FileDropZone: React.FC<FileDropZoneTypes> = ({
    onFileChange,
    fileValue,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>();

    useEffect(() => {
        setFile(fileValue);
    }, [fileValue]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFile(droppedFiles[0]);
        onFileChange(droppedFiles[0]);
    };

    return (
        <div
            className={`p-6 border-dashed rounded-md border bg-gray-300 dark:bg-gray-700 ${
                isDragging ? "brightness-50" : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {file ? (
                <ul className="pointer-events-none">
                    <li key={file.name}>
                        {file.name}{" "}
                        <span className="opacity-50">
                            {(file.size / 1000).toFixed(2)}KB
                        </span>
                    </li>
                </ul>
            ) : (
                <p className="pointer-events-none">Drag and drop image here</p>
            )}
        </div>
    );
};

export default FileDropZone;
