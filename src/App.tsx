import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Lobby from './pages/lobby/Lobby';
import Chat from './pages/chat/Chat';
import './App.css';


const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={ <Lobby /> } />
            <Route path='/room/:roomCode' element={ <Chat /> } />
        </Routes>
    )
}

export default App;
