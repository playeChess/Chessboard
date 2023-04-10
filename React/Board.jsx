import React, { Component } from 'react';

import './board.css';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function setBoardSize() {
    // setting the board size 
    let board = this.elementDOM.current.querySelector('table'), box = this.elementDOM.current

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
        let board = this.elementDOM.current.querySelector('table'), box = this.elementDOM.current;

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
                //console.log(e.target)
            })
            el.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                let tr = e.target.parentElement, tbody = tr.parentElement;
                let y = Array.prototype.indexOf.call(tbody.children, tr), x = Array.prototype.indexOf.call(tr.children, e.target);

                if (y % 2 == 0 && x % 2 == 0)
                    e.target.style.background = e.target.style.background == '' ? '#eb4034' : '';
                if (y % 2 == 0 && x % 2 == 1)
                    e.target.style.background = e.target.style.background == '' ? '#c9251a' : '';
                if (y % 2 == 1 && x % 2 == 0)
                    e.target.style.background = e.target.style.background == '' ? '#c9251a' : '';
                if (y % 2 == 1 && x % 2 == 1)
                    e.target.style.background = e.target.style.background == '' ? '#eb4034' : '';
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
            })
        })
    } 

    flip(e) {
        let board = e.target.parentElement.querySelector('table');
    
        board.style.transform = board.style.transform == 'rotate(180deg)' ? '' : 'rotate(180deg)';

        board.querySelectorAll('td').forEach(el => {
            el.style.transform = el.style.transform == 'rotate(180deg)' ? '' : 'rotate(180deg)';
        })
    }

    constructor(props) {
        super(props);

        this.elementDOM = React.createRef();
    }

    render() {
    return (
    <div id="board" ref={this.elementDOM} onResize={setBoardSize}>
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
            <Tippy content="Flip the board"><span class="material-icons" onClick={this.flip}>flip_camera_android</span></Tippy>
        </div>
    </div>
    )}
};

export default Board;
