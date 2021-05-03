import {Grid} from "./Grid";
import {Node} from "./Node";
import { Square } from "./Square";

class Draw {
    private mainBody: HTMLDivElement;
    constructor() {
        this.mainBody = document.querySelector("#main");
    }
    drawGrid(gridIn: Grid): void {
        let grid = document.createElement("div");
        grid.id = "grid";
        grid.className = "grid-container";
        let noSquaresX = screen.availWidth / 30;
        console.log(screen.availWidth);
        noSquaresX = Math.round(noSquaresX);
        console.log(noSquaresX);
        grid.style.gridTemplateColumns = `repeat(${gridIn.getX()}, ${100 / gridIn.getX()}vw)`;
        grid.style.gridTemplateRows = `repeat(${gridIn.getY()}, ${100/gridIn.getY()}vh`;
        let squares: Array<Square> = gridIn.getSquares();
        // let nodes: Array<Node> = gridIn.getNodes();
        for (let i = 0; i < squares.length; i++) {
            grid.appendChild(this.drawSquare(squares[i]));
        }
        this.mainBody.appendChild(grid);
    }
    drawSquare(squareIn: Square): HTMLDivElement {
        let square = document.createElement("div");
        square.className = "grid-square";
        square.id = `${squareIn.getId()}`;
        return square;
    }
    drawNode(nodeIn: Node): HTMLDivElement {
        let node = document.createElement("div");
        node.className = "grid-square";
        node.id = `${nodeIn.getId()}`;
        return node;
    }
    highlightSquare(Id: number, colour: String): void {
        let square = document.getElementById(`${Id}`);
        square.style.backgroundColor = `${colour}`;
        square.style.border = "";
    }
    highlightPath(squareID: number): void {
        let square = document.getElementById(`${squareID}`);
        let img = document.createElement("img");
        img.src = "https://img.icons8.com/material-outlined/24/000000/filled-circle--v1.png";
        img.style.height = `100%`;
        img.style.width = `100%`;
        square.appendChild(img);
    }
    unhighlightStart(squareID: number): void {
        let square = document.getElementById(`${squareID}`);
        square.innerHTML = "";
    }
    highlightStart(squareID: number): void {
        let square = document.getElementById(`${squareID}`);
        let img = document.createElement("img");
        img.src = "https://img.icons8.com/ios-filled/50/000000/runner-starting-the-race.png";
        img.style.height = `100%`;
        img.style.width = `100%`;
        square.appendChild(img);
        // square.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/000000/runner-starting-the-race.png"/>`;
    }
    highlightEnd(squareID: number): void {
        let square = document.getElementById(`${squareID}`);
        let img = document.createElement("img");
        img.src = "https://img.icons8.com/android/24/000000/finish-flag.png";
        img.style.height = `100%`;
        img.style.width = `100%`;
        square.appendChild(img);
    }
    drawMaze(gridIn: Grid): void {
        for (let i = 0; i < gridIn.getSquares().length; i++) {
            if (gridIn.getSquare(i).getContent().getType() == "W") {
                this.highlightSquare(i, "gray");
            }
        }
    }
}

export {Draw};