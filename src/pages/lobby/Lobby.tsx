import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { joinRoom } from '../../redux/slices/room';
import { addUser } from '../../redux/slices/user';
import './Lobby.css';


const Lobby: React.FC = () => {
    const targetInputRef = useRef<any>(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');

    const handleJoinRoom = useCallback(() => {
        if (roomCode !== '' && name !== '') {
            dispatch(addUser({id: Date.now().toString(), name: name}))
            dispatch(joinRoom(roomCode));
            navigate(`/room/${roomCode}`);
        }
    }, [dispatch, navigate, roomCode, name]);

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
