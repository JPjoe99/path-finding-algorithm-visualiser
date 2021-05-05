import { Draw } from "./Utilities/Draw";
import { Grid } from "./Grid";
import { Algorithm } from "./Algorithms/Algorithm";
import { VisitableNode } from "./Nodes/VisitableNode";
import { Dijkstra } from "./Algorithms/Dijkstra";

class Application {
    private draw: Draw;
    private grid: Grid;
    private algorithm: Algorithm;
    private startingNode: VisitableNode;
    private endingNode: VisitableNode;
    private image: any;
    constructor(grid: Grid) {
        this.grid = grid;
        this.draw = new Draw();
        this.algorithm = new Dijkstra(grid);
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
        let wallElement = document.getElementById("wall");
        wallElement.addEventListener("click", this.grabImage);
    }
    private placeImage = (e: Event): void => {
        let selectedSquareID: any = (<HTMLElement>e.target).id;
        if (this.image.type == "start") {
            if (this.startingNode != null) {
                this.draw.unhighlightStart(this.startingNode.getId());
            }
            this.selectStartingNode(<VisitableNode>this.grid.getSquare(selectedSquareID).getContent())
            this.draw.highlightStart(selectedSquareID);
        }
        else if (this.image.type == "end") {
            if (this.endingNode != null) {
                this.draw.unhighlightStart(this.endingNode.getId());
            }
            this.selectEndingNode(<VisitableNode>this.grid.getSquare(selectedSquareID).getContent());
            this.draw.highlightEnd(selectedSquareID);
        }
        else if (this.image.type == "wall") {
            this.grid.placeWallOnSquare(selectedSquareID);
            this.draw.highlightSquare(selectedSquareID, "gray");
        }
        if (this.startingNode != null && this.endingNode != null) {
            this.runAlgorithm();
        }
    }
    private grabImage = (e: Event): void => {
        let image = (<HTMLImageElement>e.target);
        this.image = {"type": `${image.id}`, "src": `${image.src}`};
    }
    private runVisualiser = (): void => {
        this.runAlgorithm();
    }
    selectStartingNode(nodeIn: VisitableNode) {
        this.startingNode = nodeIn;
    }
    selectEndingNode(nodeIn: VisitableNode) {
        this.endingNode = nodeIn;
    }
    runAlgorithm() {
        this.draw.clearVisitedNodes(this.algorithm.getVisitedNodes());
        this.algorithm.resetAlgorithm(this.startingNode, this.endingNode);
        let shortestPath = this.algorithm.run();
        // let possiblePaths = [];
        // for (let i = 0; i < this.algorithm.getVisitedNodes().length; i++) {
        //     if (this.algorithm.getVisitedNodes()[i].getStatus() == "F") {
        //         possiblePaths.push(this.algorithm.getVisitedNodes()[i]);
        //     }
        // }
        this.draw.highlightVisitedNodes(this.algorithm.getVisitedNodes(), "green");
        this.draw.highlightShortestPath(shortestPath);
    }
}

export {Application};