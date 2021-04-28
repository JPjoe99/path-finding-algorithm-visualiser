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
    }
}

export {Draw};