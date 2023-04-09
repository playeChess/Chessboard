import React from 'react';
import PropTypes from 'prop-types';

import './chessboard.css';
import 'material-icons/iconfont/material-icons.css';

function isDisplayed(d) {
    if (d == {}) return true;
    return false;
}
function displayTime(t, p) {
    t -= p;

    let ms = t % 100;
    t -= ms; t /= 100;

    let s = t % 60;
    t -= s; t /= 60;

    let m = t % 60;
    t -= m; t /= 60;

    // t = h

    if (t == 0 && m == 0) {
        return <span class="time" id="speedup">
            {s<10?'0':''}{s}:{ms<10?'0':''}{ms}
        </span>
    }
    return <span class="time">
        {t<10?'0':''}{t}:{m<10?'0':''}{m}:{s<10?'0':''}{s}
    </span>
}

export const Chessboard = ({ timer, history, details, mouvementsEnabled, orientation, gameMode, startingPosition, colorSheet, chat }) => (
    <div id="layout">
        <div class="mobile-details" id="history">
            
        </div>
        <div class="mobile-details" id="player1">
            
        </div>
        <div id="chessboard">

        </div>
        <div class="mobile-details" id="player2">
            
        </div>
        <div id="details" style={{ display: isDisplayed(details) ? 'none' : 'flex' }}>
            <div class="player">
                <p><p>{details.players[0].name}</p> <span>Rating: {details.players[0].elo}</span> {displayTime(details.time, details.players[0].time)}</p>
            </div>
            <div id="history">
                <ul>
                </ul>
            </div>
            <div id="panel">
            <span class="material-icons">undo</span><span>½</span><span class="material-icons">flag</span>
            </div>
            <div class="player">
                <p><p>{details.players[1].name}</p> <span>Rating: {details.players[1].elo}</span> {displayTime(details.time, details.players[1].time)}</p>
            </div>
        </div>
        <div class="mobile-details" id="panel">
            
        </div>
        <div class="mobile-details" id="chat">
            
        </div>
    </div>
);

Chessboard.propTypes = {
    timer: PropTypes.bool,
    history: PropTypes.bool,
    details: PropTypes.object,
    mouvementsEnabled: PropTypes.bool, 
    orientation: PropTypes.string, 
    gameMode: PropTypes.string,
    startingPosition: PropTypes.array,
    colorSheet: PropTypes.object,
    chat: PropTypes.bool
};

Chessboard.defaultProps = {
    timer: false,
    history: false,
    details: { "history": [], "players": [{ "name": "Anonymous1 player test name", "elo": 0, "time": 12010 }, { "name": "Anonymous2", "elo": 0, "time": 0 }], "increment": 0, "time": 18000 },
    mouvementsEnabled: true, 
    orientation: "w",
    gameMode: "IRL",
    startingPosition: [
                    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
                    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
                    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
                ],
    colorSheet: { "background": "#fff" },
    chat: true
};
