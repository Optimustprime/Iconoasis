import React, { useState } from 'react';

const MyComponent = () => {
    const [responseData, setResponseData] = useState(null);
    const handleClick = () => {
        fetch('https://api.thenounproject.com/v2/icon?query=parking&limit=4&thumbnail_size=84&blacklist=1&next_page=31352E3739393633322C69636F6E2331333534303034', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'oauth_consumer_key': '143ea616796042cc8e9ee02bfac3c261',
                'oauth_nonce': 'DO9qGoWRC0Z',
                'oauth_signature': 'M1N1scBoJWpjSn5xzd%2BXN0dChJE%3D',
                'oauth_signature_method': 'HMAC-SHA1',
                'oauth_timestamp': '1685715833',
                'oauth_version': '1.0'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Process the response data
                setResponseData(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <div>
            <button onClick={handleClick}>Run GET Request</button>
            {responseData && (
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
            )}
        </div>
    );
};

export default MyComponent;
