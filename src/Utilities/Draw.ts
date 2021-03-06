import {Grid} from "../Grid";
import {Node} from "../Nodes/Node";
import { Square } from "../Square";
import { VisitableNode } from "../Nodes/VisitableNode";

class Draw {
    private mainBody: HTMLDivElement;
    constructor() {
        this.mainBody = document.querySelector("#main");
    }
    drawGrid(gridIn: Grid): void {
        console.log(this.mainBody.clientWidth);
        let grid = document.createElement("div");
        grid.id = "grid";
        grid.className = "grid-container";
        let noSquaresX = screen.availWidth / 30;
        console.log(screen.availWidth);
        noSquaresX = Math.round(noSquaresX);
        console.log(noSquaresX);
        grid.style.gridTemplateColumns = `repeat(${gridIn.getX()}, ${30}px)`;
        //grid.style.gridTemplateColumns = `repeat(${gridIn.getX()}, ${100 / gridIn.getX()}px)`;
        //grid.style.gridTemplateRows = `repeat(${gridIn.getY()}, ${100/gridIn.getY()}px`;
        grid.style.gridTemplateRows = `repeat(${gridIn.getY()}, ${30}px`;
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
    // highlightPath(squareID: number): void {
    //     // let square = document.getElementById(`${squareID}`);
    //     // let img = document.createElement("img");
    //     // img.src = "https://img.icons8.com/material-outlined/24/000000/filled-circle--v1.png";
    //     // img.style.height = `100%`;
    //     // img.style.width = `100%`;
    //     // square.appendChild(img);
    // }
    highlightShortestPath(shortestPath: Array<VisitableNode>): void {
        for (let i = 0; i < shortestPath.length; i++) {
            this.highlightSquare(shortestPath[i].getId(), "yellow");
        }
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
    }
    highlightEnd(squareID: number): void {
        let square = document.getElementById(`${squareID}`);
        let img = document.createElement("img");
        img.src = "https://img.icons8.com/android/24/000000/finish-flag.png";
        img.style.height = `100%`;
        img.style.width = `100%`;
        square.appendChild(img);
    }
    highlightVisitedNodes(visitedNodes: Array<VisitableNode>, colour: string): void {
        for (let i = 0; i < visitedNodes.length; i++) {
            this.highlightSquare(visitedNodes[i].getId(), colour);
        }
    }
    execute(visitedNodes: Array<VisitableNode>, shortestPath: Array<VisitableNode>, colour: string): void {
        let i = 0;
        let handle = setInterval(() => {
            this.highlightSquare(visitedNodes[i].getId(), colour);
            i++;
            if (i == visitedNodes.length) {
                clearInterval(handle);
                this.executeShortestPath(shortestPath);
            }
        }, 25);
        // if (i == visitedNodes.length) {
        //     clearInterval(handle);
        // }
    }
    executeShortestPath(shortestPath: Array<VisitableNode>): void {
        let i = 0;
        let handle = setInterval(() => {
            this.highlightSquare(shortestPath[i].getId(), "yellow");
            i++;
            if (i == shortestPath.length) {
                clearInterval(handle);
            }
        }, 25);
    }
    clearVisitedNodes(visitedNodes: Array<VisitableNode>): void {
        this.highlightVisitedNodes(visitedNodes, "white");
    }
    // drawMaze(gridIn: Grid): void {
    //     for (let i = 0; i < gridIn.getSquares().length; i++) {
    //         if (gridIn.getSquare(i).getContent().getType() == "W") {
    //             this.highlightSquare(i, "gray");
    //         }
    //     }
    // }
    // visualiseSearch(visitedNodes: Array<Node>): TimerHandler {
    // }
}

export {Draw};