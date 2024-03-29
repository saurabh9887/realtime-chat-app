import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Input, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons'
import Pubnub from 'pubnub';
import config from '../../config/config.json'
import './Chat.css';
import { getUserDataSelector } from '../../redux/slices/user';
import { getRoomDataSelector } from '../../redux/slices/room';
import { useSelector } from 'react-redux';


const Chat: React.FC = () => {
    const msgCont = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const roomCode = useSelector(getRoomDataSelector);
    const user = useSelector(getUserDataSelector);
    
    const [typedMessage, setTypedMessage] = useState<string>('');
    const [messages, setMessages] = useState<Pubnub.MessageEvent[]>([]);

    const pubnub = new Pubnub({
        publishKey: config['PUB_KEY'],
        subscribeKey: config['SUB_KEY'],
        uuid: user.id || Date.now().toString(),
    });

    useEffect(() => {
        if (user.id === '') {
            navigate('/');
        }
    }, [navigate, user]);
    
    /* add listener */
    useEffect(() => {
        if (roomCode) {
            /* add listener */
            const listener = {
                message: (messageEvent: Pubnub.MessageEvent) => {
                    console.log(`New message rec`, messageEvent);
                    setMessages((prevMessages) => [...prevMessages, messageEvent])
                }
            };
            pubnub.addListener(listener);
            return () => {
                /* cleanup listener */
                pubnub.removeListener(listener);
            }
        }
    }, [roomCode]);

    /* subscribe to a channel  */
    useEffect(() => {
        if (roomCode) {
            /* subscribe to a channel */
            console.log(`Subscribe to ${roomCode}`);
            pubnub.subscribe({
                channels: [roomCode]
            });
            /* cleanup subscription */
            return () => {
                console.log(`Unsubscribe from ${roomCode}`);
                pubnub.unsubscribe({
                    channels: [roomCode]
                });
            };
        }
    }, [roomCode]);

    /* auto scroll */
    useEffect(() => {
        if (messages && msgCont.current) {
            msgCont.current.scrollTop = msgCont.current.scrollHeight;
        }
    }, [messages]);

    /* publish message */
    const handleSendMessage = useCallback(() => {
        if (typedMessage && roomCode) {
            pubnub.publish({
                channel: roomCode,
                message: {
                    'name': user.name,
                    'msg': typedMessage,
                    'time': time()
                }
            });
            setTypedMessage('');
        }
    }, [typedMessage, roomCode]);

    const time = () => {
        const date = new Date();
        /* define the options for formatting */
        const options:any = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        /* format the date */
        const formattedDate = date.toLocaleDateString('en-GB', options);
        /* replace '/' with '-' */
        return formattedDate.toUpperCase().replace(/\//g, '-');
    }

    const copyRoomCode = useCallback(() => {
        navigator.clipboard.writeText(roomCode ? roomCode.toString() : '');
        message.success('Room code copied sucessfully!', 2);
    }, [roomCode]);

    return (
        <div className='chat-cont'>
            <div ref={msgCont} className='msg-box'>
                <Input type='text' addonBefore="Room code" addonAfter={<CopyOutlined onClick={copyRoomCode} />} defaultValue={roomCode} />
                {
                    messages.map((msg) => (
                        <div key={msg.message?.time} className={msg.publisher === user.id ? 'align-rhs': ''}> 
                            <span> ~{msg.message?.name} </span>
                            <span> {msg.message?.msg} </span>
                            <span> {msg.message?.time} </span>
                        </div>
                    ))
                }
            </div>
            <div className='action'>
                <Input 
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                    autoFocus
                    type='text'
                    placeholder='Type your message here...'
                />
                <Button 
                    onClick={handleSendMessage}
                    disabled={typedMessage === ''}
                    type='primary'
                > 
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Chat;
