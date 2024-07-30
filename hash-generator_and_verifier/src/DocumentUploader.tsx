import React, { useState } from 'react';
import crypto from 'crypto-browserify';

const DocumentUploader: React.FC = () => {
    const [fileHash, setFileHash] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const buffer = Buffer.from(arrayBuffer);
                const hash = crypto.createHash('sha256').update(buffer).digest('hex');
                setFileHash(hash);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <h1>Document Hash Generator</h1>
            <input type="file" onChange={handleFileUpload} />
            {fileHash && (
                <div>
                    <h3>Generated Hash:</h3>
                    <p>{fileHash}</p>
                </div>
            )}
        </div>
    );
};

export default DocumentUploader;