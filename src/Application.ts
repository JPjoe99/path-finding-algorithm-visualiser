import { Draw } from "./Utilities/Draw";
import { Grid } from "./Grid";
import { Algorithm } from "./Algorithms/Algorithm";
import { VisitableNode } from "./Nodes/VisitableNode";
import { Dijkstra } from "./Algorithms/Dijkstra";
import { AStar } from "./Algorithms/AStar"; 

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
        this.image = "";
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
            //squares[i].addEventListener("mouseenter", this.hoverIn);
            //squares[i].addEventListener("mouseout", this.hoverOut);
        }
        let visualiseBtn = document.querySelector(".visualise");
        visualiseBtn.addEventListener("click", this.runVisualiser);
        let imgElements = document.getElementsByTagName("img");
        for (let i = 0; i < imgElements.length; i++) {
            imgElements[i].addEventListener("mousedown", this.grabImage);
        }
        let wallElement = document.getElementById("wall");
        wallElement.addEventListener("click", this.grabImage);
        let algoElements = document.querySelectorAll("#algo");
        for (let i = 0; i < algoElements.length; i++) {
            algoElements[i].addEventListener("click", this.selectAlgorithm);
        }
    }
    private hoverOut = (e: Event): void => {
        let element = <HTMLImageElement>e.target;
        console.log(element.src);
        // console.log(<HTMLImageElement>e.target);
        // let selectedSquareID: any = (<HTMLElement>e.target).id;
        // this.draw.highlightSquare(selectedSquareID, "white");

    }
    private hoverIn = (e: Event): void => {
        let selectedSquareID: any = (<HTMLElement>e.target).id;
        this.draw.highlightStart(selectedSquareID);
    }
    private selectAlgorithm = (e: Event): void => {
        let selectedAlgorithm = (<HTMLElement>e.target);
        console.log(selectedAlgorithm.innerText);
        if (selectedAlgorithm.innerText == "Dijkstra") {
            this.algorithm = new Dijkstra(this.grid);
        }
        else if (selectedAlgorithm.innerText = "A*") {
            this.algorithm = new AStar(this.grid);
        }
    }
    private placeImage = (e: Event): void => {
        let selectedSquareID: any = (<HTMLElement>e.target).id;
        if (this.image.type == "start") {
            if (this.startingNode != null) {
                this.draw.unhighlightStart(this.startingNode.getId());
            }
            this.selectStartingNode(<VisitableNode>this.grid.getSquare(selectedSquareID).getContent())
            this.draw.highlightStart(selectedSquareID);
            this.image = "";
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
        let t0 = performance.now();
        let shortestPath = this.algorithm.run();
        let t1 = performance.now();
        console.log(`Time taken to find shortest path: ${t1 - t0}`);
        // let possiblePaths = [];
        // for (let i = 0; i < this.algorithm.getVisitedNodes().length; i++) {
        //     if (this.algorithm.getVisitedNodes()[i].getStatus() == "F") {
        //         possiblePaths.push(this.algorithm.getVisitedNodes()[i]);
        //     }
        // }
        console.log(this.algorithm.getVisitedNodes());
        this.draw.execute(this.algorithm.getVisitedNodes(), shortestPath, "green");
        //this.draw.highlightVisitedNodes(this.algorithm.getVisitedNodes(), "green");
        shortestPath.sort();
        //this.draw.highlightShortestPath(shortestPath);
    }
}

export {Application};