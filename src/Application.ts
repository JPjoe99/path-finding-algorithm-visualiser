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
    constructor(grid: Grid) {
        this.grid = grid;
        this.draw = new Draw();
        this.logic = new Logic(grid);
        this.startingNode = null;
        this.endingNode = null;
    }
    startApplication() {
        this.draw.drawGrid(this.grid);
        this.runApplication();
    }
    runApplication() {
        let grid = document.querySelector("#grid");
        let squares = grid.children;
        for (let i = 0; i < squares.length; i++) {
            squares[i].id = `${i}`;
            squares[i].addEventListener("click", this.selectSquare);
        }
    }
    private selectSquare = (e: Event): void => {
        console.log(e);
        let squareId: any = (<HTMLElement>e.target).id;
        let selectedSquare: Square = this.grid.getSquare(squareId);
        if ((<any>e).ctrlKey == true) {
            if (this.startingNode != null) {
                let currentNode = this.startingNode;
                let id = currentNode.getId();
                this.draw.highlightSquare(id, "white");
            }
            let selectedNode = selectedSquare.getContent();
            this.selectStartingNode(<Node>selectedNode);
            this.draw.highlightSquare(selectedNode.getId(), "red");
        }
        else if ((<any>e).altKey == true) {
            if (this.endingNode != null) {
                let currentNode = this.endingNode;
                let id = currentNode.getId();
                this.draw.highlightSquare(id, "white");
            }
            let selectedNode = selectedSquare.getContent();
            this.selectEndingNode(<Node>selectedNode);
            this.draw.highlightSquare(selectedNode.getId(), "green");
        }
        else {
            let x = selectedSquare.getX();
            let y = selectedSquare.getY();
            let id = selectedSquare.getId();
            this.draw.highlightSquare(id, "white");
            selectedSquare.setContent(new Wall(x, y, id));
            this.draw.highlightSquare(id, "black");

        }
        if (this.startingNode != null && this.endingNode != null) {
            console.log("Here");
            this.runDijkstra();
        }
    }
    selectStartingNode(nodeIn: Node) {
        this.startingNode = nodeIn;
    }
    selectEndingNode(nodeIn: Node) {
        this.endingNode = nodeIn;
    }
    runDijkstra() {
        let shortestPath = this.logic.getShortestPath();
        for (let i = 0; i < shortestPath.length; i++) {
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
        let currentNode = this.logic.getStartingNode();
        while (currentNode != this.logic.getEndingNode()) {
            //console.log(currentNode);
             this.logic.performDijkstra(currentNode);
             currentNode = this.logic.getUnvisitedNodes()[0];
        }
        console.log(this.logic.getUnvisitedNodes());
        console.log(this.logic.getVisitedNodes());
        //     for (let i = 0; i < this.logic.getVisitedNodes().length; i++) {
        //     this.draw.highlightSquare(this.logic.getVisitedNodes()[i].getId(), "blue");
        // }
        this.logic.getVisitedNodes().push(this.logic.getEndingNode());

        let finalNode = this.logic.getVisitedNodes()[this.logic.getVisitedNodes().length-1];

        while (finalNode.getNodePastThrough().getStatus() != "S") {
            shortestPath.push(finalNode);
            finalNode = finalNode.getNodePastThrough();
        }
        shortestPath.push(finalNode);
        shortestPath.shift();
        // shortestPath.push(finalNode.getNodePastThrough());
        //console.log(shortestPath);

        for (let i = 0; i < shortestPath.length; i++) {
            this.draw.highlightSquare(shortestPath[i].getId(), "blue");
        }
    }
}

export {Application};