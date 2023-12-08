const express = require('express');
const { AccessToken, Role } = require('@huddle01/server-sdk/auth');
const app = express();
const port = 3001;

app.use(express.json());

// Replace with your actual API key and Room ID, and ensure they are kept secure
const apiKey = "WRK7aHhUs6KwyWR534VDkTyTq1rUG-rT"; 
const roomId = "pia-mswj-xbf";

app.post('/generate-token', async (req, res) => { // Note the async keyword here
    try {
        const accessToken = new AccessToken({
            apiKey,
            roomId,
            role: Role.HOST,
            permissions: {
                admin: true,
                canConsume: true,
                canProduce: true,
                canProduceSources: {
                    cam: true,
                    mic: true,
                    screen: true,
                },
                canRecvData: true,
                canSendData: true,
                canUpdateMetadata: true,
            },
            options: {
                metadata: { 
                    walletAddress: "0xf7eD5AEd83921E1e1e19adb506954bE031D0E4b3" // replace with actual wallet address or other metadata
                },
            },
        });

        console.log('AccessToken instance:', accessToken);
        
        // Await the resolution of the promise returned by toJwt()
        const token = await accessToken.toJwt(); // Use await here

        console.log('Generated JWT token:', token);

        // Check if the token is a non-empty string
        if (typeof token !== 'string' || token.length === 0) {
            throw new Error('JWT token generation failed - Token is empty.');
        }

        res.json({ token });
    } catch (error) {
        console.error('Error during token generation:', error);
        res.status(500).send("Error generating token: " + error.message);
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
