import { Draw } from "./Draw";
import { Grid } from "./Grid";
import { Logic } from "./logic";
import { Node } from "./Node";
import { Square } from "./Square"; 
import { Wall } from "./Wall";

class Application {
    private draw: Draw;
    private grid: Grid;
    private logic: Logic;
    private startingNode: Node;
    private endingNode: Node;
    private image: any;
    constructor(grid: Grid) {
        this.grid = grid;
        this.draw = new Draw();
        this.logic = new Logic(grid);
        this.startingNode = null;
        this.endingNode = null;
        this.image = null;
    }
    startApplication() {
        this.draw.drawGrid(this.grid);
        this.runApplication();
    }
    runApplication() {
        let grid = document.querySelector("#grid");
        let squares = grid.children;
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener("click", this.placeImage);
        }
        let visualiseBtn = document.querySelector(".visualise");
        visualiseBtn.addEventListener("click", this.runVisualiser);
        let imgElements = document.getElementsByTagName("img");
        for (let i = 0; i < imgElements.length; i++) {
            imgElements[i].addEventListener("mousedown", this.grabImage);
        }
        let mazeButton = document.querySelector("#maze");
        mazeButton.addEventListener("click", this.createMaze);
    }
    private placeImage = (e: Event): void => {
        let selectedSquareID: any = (<HTMLElement>e.target).id;
        if (this.image == null) {
            let square = this.grid.getSquare(selectedSquareID);
            let squareX = square.getX();
            let squareY = square.getY();
            square.placeWall(new Wall(squareX, squareY, selectedSquareID));
            this.draw.highlightSquare(selectedSquareID, "gray");
        }
        console.log(selectedSquareID);
        if (this.image.type == "start") {
            if (this.startingNode != null) {
                this.draw.unhighlightStart(this.startingNode.getId());
            }
            this.selectStartingNode(<Node>this.grid.getSquare(selectedSquareID).getContent())
            this.draw.highlightStart(selectedSquareID);
        }
        else if (this.image.type == "end") {
            if (this.endingNode != null) {
                this.draw.unhighlightStart(this.endingNode.getId());
            }
            this.selectEndingNode(<Node>this.grid.getSquare(selectedSquareID).getContent());
            this.draw.highlightEnd(selectedSquareID);
        }
        if (this.startingNode != null && this.endingNode != null) {
            this.runDijkstra();
        }
    }
    private grabImage = (e: Event): void => {
        let image = (<HTMLImageElement>e.target);
        this.image = {"type": `${image.id}`, "src": `${image.src}`};
    }
    private runVisualiser = (): void => {
        this.runDijkstra();
    }
    selectStartingNode(nodeIn: Node) {
        this.startingNode = nodeIn;
    }
    selectEndingNode(nodeIn: Node) {
        console.log(nodeIn);
        this.endingNode = nodeIn;
    }
    runDijkstra() {
        let shortestPath = this.logic.getShortestPath();
        for (let i = 0; i < shortestPath.length; i++) {
            // this.draw.unhighlightStart(shortestPath[i].getId());
            this.draw.highlightSquare(shortestPath[i].getId(), "white");
        }
        // for (let i = 0; i < this.logic.getVisitedNodes().length; i++) {
        //     this.draw.highlightSquare(this.logic.getVisitedNodes()[i].getId(), "white");
        // }
        //console.log(this.logic.getUnvisitedNodes());
        this.logic.resetShortestPath();
        shortestPath = this.logic.getShortestPath();
        this.logic.resetUnvisitedNodes();
        this.logic.resetVisitedNodes();
        this.logic.setStartingNode(this.startingNode);
        this.logic.setEndingNode(this.endingNode);
        this.logic.setDistances();
        this.logic.setNumberOfEdges();
        let currentNode = this.logic.getStartingNode();
        while (this.logic.getUnvisitedNodes().length != 0) {
             this.logic.performDijkstra(currentNode);
             currentNode = this.logic.getUnvisitedNodes()[0];
        }
        //this.logic.performDijkstra(currentNode);
        this.logic.getVisitedNodes().push(this.logic.getEndingNode());
        for (let i = 0; i < this.logic.getVisitedNodes().length; i++) {
            if (this.logic.getVisitedNodes()[i].getStatus() == "F") {
                console.log(this.logic.getVisitedNodes()[i]);
            }
        }
        // console.log(this.logic.getVisitedNodes());
        let finalNode = this.logic.getVisitedNodes()[this.logic.getVisitedNodes().length-1];
        while (finalNode.getNodePastThrough().getStatus() != "S") {
            shortestPath.push(finalNode);
            finalNode = finalNode.getNodePastThrough();
        }
        shortestPath.push(finalNode);
        shortestPath.shift();
        // shortestPath.push(finalNode.getNodePastThrough());
        console.log(shortestPath);

        for (let i = 0; i < shortestPath.length; i++) {
            // this.draw.highlightPath(shortestPath[i].getId());
            this.draw.highlightSquare(shortestPath[i].getId(), "yellow");
        }
    }
    private createMaze = (): void => {
        this.logic.generateMaze();
        this.draw.drawMaze(this.grid);
    }
}

export {Application};