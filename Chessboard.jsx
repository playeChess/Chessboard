import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './chessboard.css';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import 'material-icons/iconfont/material-icons.css';

function isDisplayed(d) {
    if (d == {}) return false;
    return true;
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
function setBoardSize() {
    // setting the board size 
    let board = this.elementDOM.current.querySelector('table'), box = this.elementDOM.current.querySelector('#chessboard');

    if (box.clientHeight < box.clientWidth) {
        board.style.height = '100%';
        board.style.width = '';
    }
    else {
        board.style.height = '';
        board.style.width = '100%';
    }
}

class Chessboard extends Component {
    componentDidMount() {
        // setting the board size 
        let board = this.elementDOM.current.querySelector('table'), box = this.elementDOM.current.querySelector('#chessboard');

        if (box.clientHeight < box.clientWidth) {
            board.style.height = '100%';
            board.style.width = '';
        }
        else {
            board.style.height = '';
            board.style.width = '100%';
        }

        // add pending figures
        this.elementDOM.current.querySelectorAll('td').forEach(el => {
            el.addEventListener('mouseup', (e) => {
                console.log(e.target)
            })
        })
    } 

    constructor(props) {
        super(props);

        this.elementDOM = React.createRef();

        this.state = {
            details: props.details,
            mouvementsEnabled: props.mouvementsEnabled,
            orientation: props.orientation,
            gameMode: props.gameMode,
            startingPosition: props.startingPosition,
            colorSheet: props.colorSheet,
            chat: props.chat
        }
    }

    render() {
    return (
    <div id="overflow" ref={this.elementDOM} onResize={setBoardSize}>
        <div id="layout">
            <div class="mobile-details" id="history">
                
            </div>
            <div class="mobile-details" id="player1">
                
            </div>
            <div id="chessboard">
                <div id="game">
                    <table>
                        <tbody>
                            <tr><td id="a8"></td><td id="b8"></td><td id="c8"></td><td id="d8"></td><td id="e8"></td><td id="f8"></td><td id="g8"></td><td id="h8" class="y8"></td></tr>
                            <tr><td id="a7"></td><td id="b7"></td><td id="c7"></td><td id="d7"></td><td id="e7"></td><td id="f7"></td><td id="g7"></td><td id="h7" class="y7"></td></tr>
                            <tr><td id="a6"></td><td id="b6"></td><td id="c6"></td><td id="d6"></td><td id="e6"></td><td id="f6"></td><td id="g6"></td><td id="h6" class="y6"></td></tr>
                            <tr><td id="a5"></td><td id="b5"></td><td id="c5"></td><td id="d5"></td><td id="e5"></td><td id="f5"></td><td id="g5"></td><td id="h5" class="y5"></td></tr>
                            <tr><td id="a4"></td><td id="b4"></td><td id="c4"></td><td id="d4"></td><td id="e4"></td><td id="f4"></td><td id="g4"></td><td id="h4" class="y4"></td></tr>
                            <tr><td id="a3"></td><td id="b3"></td><td id="c3"></td><td id="d3"></td><td id="e3"></td><td id="f3"></td><td id="g3"></td><td id="h3" class="y3"></td></tr>
                            <tr><td id="a2"></td><td id="b2"></td><td id="c2"></td><td id="d2"></td><td id="e2"></td><td id="f2"></td><td id="g2"></td><td id="h2" class="y2"></td></tr>
                            <tr><td id="a1" class="x1"></td><td id="b1" class="x2"></td><td id="c1" class="x3"></td><td id="d1" class="x4"></td><td id="e1" class="x5"></td><td id="f1" class="x6"></td><td id="g1" class="x7"></td><td id="h1" class="x8 y1"></td></tr>
                        </tbody>
                    </table>
                    <Tippy content="Flip the board"><span class="material-icons">flip_camera_android</span></Tippy>
                </div>
            </div>
            <div class="mobile-details" id="player2">
                
            </div>
            {isDisplayed(this.state.details) &&
            (() => { try { return <div id="details">
                <div class="player">
                    <p><p><Tippy content={<span>{this.state.details.players[0].name}</span>}><b>{this.state.details.players[0].name}</b></Tippy></p> <span>Rating: {this.state.details.players[0].elo}</span> {displayTime(this.state.details.time, this.state.details.players[0].time)}</p>
                </div>
                <div id="history">
                    <ul>

                    {this.state.details.history.map((h, i) => (
                        <li><span>{i+1}.</span> <div><span className={ (this.state.details.currentMove[0] == i && this.state.details.currentMove[1] == 0 ? 'current' : '') }>{h[0]||''}</span> <span className={ (this.state.details.currentMove[0] == i && this.state.details.currentMove[1] == 1 ? 'current' : '') }>{h[1]||''}</span></div></li>
                    ))}

                    </ul>
                </div>
                <div id="panel">
                <Tippy content="Propose a trackback"><span class="material-icons">undo</span></Tippy>
                <Tippy content="Offer a draw"><span>½</span></Tippy>
                <Tippy content="Resign"><span class="material-icons">flag</span></Tippy>
                </div>
                <div class="player">
                    <p><p><Tippy content={<span>{this.state.details.players[1].name}</span>}><b>{this.state.details.players[1].name}</b></Tippy></p> <span>Rating: {this.state.details.players[1].elo}</span> {displayTime(this.state.details.time, this.state.details.players[1].time)}</p>
                </div>
                <div id="chat">
                    <h2>Chat</h2>
                    <div id="messages">
                        <section>
                            {this.state.details.messages.map(el => (
                                <div>
                                    {el.author == null ? <p class="self">{el.content}<i><span>~</span>You</i></p> : <p><i>{el.author}<span>~</span></i>{el.content}</p>}
                                </div>
                            ))}
                        </section>
                    </div>
                    <div id="input">
                    <input type="text" /><span class="material-icons">send</span>
                    </div>
                </div>
            </div>}catch{}})()
            }
            <div class="mobile-details" id="panel">
                
            </div>
            <div class="mobile-details" id="chat">
                
            </div>
        </div>
    </div>
    )}
};

export default Chessboard;

Chessboard.propTypes = {
    details: PropTypes.object,
    mouvementsEnabled: PropTypes.bool, 
    orientation: PropTypes.string, 
    gameMode: PropTypes.string,
    startingPosition: PropTypes.array,
    colorSheet: PropTypes.object,
    chat: PropTypes.bool
};

Chessboard.defaultProps = {
    details: { "history": [['a2', 'b5'], ['a2', 'b5'], ['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'],['a2', 'b5'], ['a3']], "players": [{ "name": "Anonymous1 player test name", "elo": 0, "time": 12010 }, { "name": "Anonymous2", "elo": 2670, "time": 0 }], "increment": 0, "time": 18000, "currentMove": [2, 1], "messages": [{ "author": "titi", "content": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" }, { "author": "titi", "content": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" }, { "author": null, "content": "hi" }] },
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
