import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Lobby from './pages/lobby/Lobby';
import Chat from './pages/chat/Chat';
import './App.css';


const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={ <Lobby /> } />
            <Route path='/room/:roomCode' element={ <Chat /> } />
            <Route path="/*" element={ <Navigate to='/' replace /> } />
        </Routes>
    )
}

export default App;
