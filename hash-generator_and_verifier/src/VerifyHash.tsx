import React, { useState } from 'react';
import axios from 'axios';

const VerifyHash: React.FC = () => {
  const [transactionId, setTransactionId] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  const [apiResult, setApiResult] = useState<string>('');
  const [match, setMatch] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransactionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(event.target.value);
  };

  const handleHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  const verifyHash = async () => {
    if (!transactionId || !hash) {
      setError('Transaction ID and hash must be provided.');
      return;
    }

    try {
      const response = await axios.get(`https://testnet-idx.algonode.cloud/v2/transactions?txid=${transactionId}`);
      console.log('API Response:', response.data);

      const globalStateDelta = response.data.transactions[0]['global-state-delta'];
      if (!globalStateDelta || globalStateDelta.length === 0) {
        setError('Global state delta not found.');
        return;
      }

      const apiHashBase64 = globalStateDelta[0]?.value?.bytes;
      if (!apiHashBase64) {
        setError('Hash data not found in the transaction.');
        return;
      }

      // Convert base64 to bytes
      const decodedString = atob(apiHashBase64);
      const decodedBytes = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        decodedBytes[i] = decodedString.charCodeAt(i);
      }

      // Convert bytes to UTF-8 string
      const decoder = new TextDecoder('utf-8');
      const decodedUtf8String = decoder.decode(decodedBytes);

      console.log('Decoded API Hash (UTF-8):', decodedUtf8String);

      setApiResult(decodedUtf8String);
      setMatch(decodedUtf8String === hash);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch API result', error);
      setError('Failed to fetch transaction data.');
    }
  };

  return (
    <div>
      <h2>Verify Hash</h2>
      <div>
        <label>
          Transaction ID:
          <input type="text" value={transactionId} onChange={handleTransactionIdChange} />
        </label>
      </div>
      <div>
        <label>
          Hash:
          <input type="text" value={hash} onChange={handleHashChange} />
        </label>
      </div>
      <button onClick={verifyHash}>Verify</button>
      {apiResult && <p>API Result (Decoded Hash): {apiResult}</p>}
      {match !== null && <p>Match: {match ? 'Yes' : 'No'}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyHash;
