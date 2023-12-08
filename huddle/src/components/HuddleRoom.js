// HuddleRoom.js

import React from 'react';
import { useRoom } from '@huddle01/react/hooks';

const HuddleRoom = ({ roomId, token, onJoinSuccess }) => {
    const { joinRoom } = useRoom({
        onJoin: () => {
            console.log('Joined room');
            if(onJoinSuccess) {
                onJoinSuccess();
            }
        },
    });

    React.useEffect(() => {
        if (roomId && token) {
            joinRoom({
                roomId: roomId,
                token: token
            });
        }
    }, [roomId, token, joinRoom]);

    return (
        <div>
            <h1>Connecting to Huddle Room...</h1>
            {/* You can add more UI elements here as needed */}
        </div>
    );
};

export default HuddleRoom;
