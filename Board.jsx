import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './board.css';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function setBoardSize() {
    // setting the board size 
    let board = this.elementDOM.current.querySelector('#flippy'), box = this.elementDOM.current

    if (box.clientHeight < box.clientWidth) {
        board.style.height = '100%';
        board.style.width = '';
    }
    else {
        board.style.height = '';
        board.style.width = '100%';
    }
}

class Board extends Component {
    componentDidMount() {
        // setting the board size 
        let board = this.elementDOM.current.querySelector('#flippy'), box = this.elementDOM.current;

        this.elementDOM.current.querySelector('table').setElement = null

        if (box.clientHeight < box.clientWidth) {
            board.style.height = '100%';
            board.style.width = '';
        }
        else {
            board.style.height = '';
            board.style.width = '100%';
        }

        if (this.state.orientation != 'w') {
            let board = this.elementDOM.current.querySelector('#flippy');
    
            board.style.transform = board.style.transform == 'rotate(180deg)' ? '' : 'rotate(180deg)';

            if (board.classList.contains('flipped'))
                board.classList.remove('flipped')
            else 
                board.classList.add('flipped')
        }

        // starting position

        // add pending figures
        this.elementDOM.current.querySelectorAll('td').forEach(el => {
            el.addEventListener('mouseup', (e) => {
                console.log(this.elementDOM.current.querySelector('table').setElement, this.state.gameMode)

                if (this.elementDOM.current.querySelector('table').setElement && this.state.gameMode == 'edition') {
                    console.log(el)
                    el.appendChild(this.elementDOM.current.querySelector('table').setElement);
                    this.elementDOM.current.querySelector('table').setElement = null;
                }
            })
            el.addEventListener('mousedown', (e) => {
                this.elementDOM.current.querySelector('table').start = el.id
            })
            el.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                let target = e.target;
                
                if (target.tagName == 'DIV')
                    target = target.parentElement;

                let tr = target.parentElement, tbody = tr.parentElement;
                let y = Array.prototype.indexOf.call(tbody.children, tr), x = Array.prototype.indexOf.call(tr.children, target);

                if (y % 2 == 0 && x % 2 == 0)
                    target.style.background = target.style.background == '' ? '#eb4034' : '';
                if (y % 2 == 0 && x % 2 == 1)
                    target.style.background = target.style.background == '' ? '#c9251a' : '';
                if (y % 2 == 1 && x % 2 == 0)
                    target.style.background = target.style.background == '' ? '#c9251a' : '';
                if (y % 2 == 1 && x % 2 == 1)
                    target.style.background = target.style.background == '' ? '#eb4034' : '';

                target.style.color = target.style.color == '' ? '#19161b' : '';
            })
        })

        board.addEventListener('click', (e) => {
            // delete all warnings

            let t = e.target;

            try {
                while (t.tagName != 'TABLE') {
                    t = t.parentElement;
                }
            } catch {}

            t.querySelectorAll('td').forEach(el => {
                el.style.background = '';
                el.style.color = '';
            })
        })
    } 

    flip(e) {
        let board = e.target.parentElement.querySelector('#flippy');
    
        board.style.transform = board.style.transform == 'rotate(180deg)' ? '' : 'rotate(180deg)';

        if (board.classList.contains('flipped'))
            board.classList.remove('flipped')
        else 
            board.classList.add('flipped')
    }

    constructor(props) {
        super(props);

        this.state = {
            details: props.details,
            mouvementsEnabled: props.mouvementsEnabled,
            orientation: props.orientation,
            gameMode: props.gameMode,
            startingPosition: props.startingPosition,
            colorSheet: props.colorSheet,
        }

        this.elementDOM = React.createRef();

        this.pendingElement = null;
    }

    render() {
    return (
    <div id="board" ref={this.elementDOM} onResize={setBoardSize}>
        <div id="game">
            <div id="flippy">
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
            </div>
            <Tippy content="Flip the board"><span class="material-icons" onClick={this.flip}>flip_camera_android</span></Tippy>
        </div>
    </div>
    )}
};

export default Board;

Board.propTypes = {
    details: PropTypes.object,
    mouvementsEnabled: PropTypes.bool, 
    orientation: PropTypes.string, 
    gameMode: PropTypes.string,
    startingPosition: PropTypes.array,
    colorSheet: PropTypes.object,
};

Board.defaultProps = {
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
};
