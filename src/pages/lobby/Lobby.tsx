import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import './Lobby.css';


const Lobby: React.FC = () => {
    const targetInputRef = useRef<any>(null);
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');
    const userId = Date.now().toString();

    const handleJoinRoom = useCallback(() => {
        if (roomCode !== '' && name !== '' && userId) {
            navigate(`/room/${roomCode}`, {state: {userId: userId, name: name}});
        }
    }, [navigate, roomCode, name, userId]);

    return (
        <div className='lobby-cont'>
            <h1> Welcome to Chat App </h1>
            <span>
                <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    autoFocus 
                    onPressEnter={(e) => name !== '' ? targetInputRef.current?.focus() : null }
                    type='text' 
                    placeholder='Enter your full name (Ex: Amit Manna)' 
                />
                <Input 
                    value={roomCode} 
                    onChange={(e) => setRoomCode(e.target.value)} 
                    ref={targetInputRef}
                    disabled={name === ''}
                    type='text' 
                    placeholder='Enter your room code (Ex: AMKR07)' 
                    onPressEnter={handleJoinRoom}
                />
                <Button 
                    onClick={handleJoinRoom} 
                    disabled={name === '' || roomCode === ''} 
                    type='primary'
                > 
                    Join Room 
                </Button>
            </span>
        </div>
    )
}

export default Lobby;
