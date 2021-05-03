import { Grid } from "./Grid";
import {Node} from "./Node";
import { Square } from "./Square";
import {Object} from "./Object";
import { Wall } from "./Wall";

class Logic {
    private grid: Grid;
    private unvisitedNodes: Array<Node> = [];
    private shortestPath: Array<Node> = [];
    private visitedNodes: Array<Node> = [];
    private startingNode: Node;
    private endingNode: Node;
    private totNumberOfEdges: number;
    constructor(grid: Grid) {
        this.grid = grid;
        this.startingNode = null;
        this.endingNode = null;
        let gridSquares: Array<Square> = grid.getSquares();
        for (let i = 0; i < gridSquares.length; i++) {
            let squareContent = gridSquares[i].getContent();
            if (squareContent.getType() == "N") {
                this.unvisitedNodes.push(<Node>squareContent);
            }
        }
        this.totNumberOfEdges = 0;
    }
    getStartingNode(): Node {
        return this.startingNode;
    }
    setStartingNode(node: Node): void {
        this.startingNode = node;
        this.startingNode.setStatus("S");
    }
    getEndingNode(): Node {
        return this.endingNode;
    }
    setEndingNode(node: Node): void {
        this.endingNode = node;
        this.endingNode.setStatus("F");
    }
    getVisitedNodes(): Array<Node> {
        return this.visitedNodes;
    }
    resetVisitedNodes(): void {
        this.visitedNodes = [];
    }
    resetUnvisitedNodes(): void {
        this.unvisitedNodes = [];
        let gridSquares: Array<Square> = this.grid.getSquares();
        for (let i = 0; i < gridSquares.length; i++) {
            let squareContent = gridSquares[i].getContent();
            if (squareContent.getType() == "N") {
                this.unvisitedNodes.push(<Node>squareContent);
            }
        }
        for (let i = 0; i < this.unvisitedNodes.length; i++) {
            this.unvisitedNodes[i].setVisitStatus(false);
        }
    }
    setShortestPath(shortestPath: Array<Node>): void {
        this.shortestPath = shortestPath;
    }
    resetShortestPath(): void {
        this.shortestPath = [];
    }
    getShortestPath(): Array<Node> {
        return this.shortestPath;
    }
    getUnvisitedNodes(): Array<Node> {
        return this.unvisitedNodes;
    }
    setDistances(): void {
        for (let i = 0; i < this.unvisitedNodes.length; i++) {
            if (this.unvisitedNodes[i].getStatus() == "S") {
                this.unvisitedNodes[i].setDistance(0);
            }
            else {
                this.unvisitedNodes[i].setDistance(Infinity);
            }
        }
        this.unvisitedNodes.sort((a,b) => (a.getDistance() > b.getDistance() ? 1 : -1));
    }
    setNumberOfEdges(): void {
        for (let i = 0; i < this.unvisitedNodes.length; i++) {
            if (this.unvisitedNodes[i].getStatus() == "S") {
                this.unvisitedNodes[i].setNumberOfEdges(0);
            }
            else {
                this.unvisitedNodes[i].setNumberOfEdges(Infinity);
            }
        }

    }
    generateMaze(): void {
        for (let i = 0; i < this.grid.getSquares().length; i++) {
            let x = this.grid.getSquare(i).getX();
            let y = this.grid.getSquare(i).getY();
            this.grid.getSquare(i).placeWall(new Wall(x, y, i));
        }
    }
    performDijkstra(startNode: Node): void {
        // while (startNode.getStatus() != "F") {
            let unvisitedNodes = this.getUnvisitedNodes();
        // console.log(unvisitedNodes[0]);
        // unvisitedNodes.sort((a,b) => (a.getDistance() > b.getDistance() ? 1 : -1));
        // console.log(unvisitedNodes);
            let nearestNeighbours: Array<Node> = [];
            let numberOfEdges: number = 4;
            //let dist = startNode.getDistance();
            let currentNumberOfEdges = this.totNumberOfEdges;
            for (let i = 0; i < unvisitedNodes.length; i++) {
                if (unvisitedNodes[i].getType() != "W") {
                    if ((startNode.getX() - unvisitedNodes[i].getX() == 1 || startNode.getX() - unvisitedNodes[i].getX() == -1)
                    && startNode.getY() - unvisitedNodes[i].getY() == 0 && startNode.getNodePastThrough() != unvisitedNodes[i]) {
                        nearestNeighbours.push(unvisitedNodes[i]);
                    }
                    else if ((startNode.getY() - unvisitedNodes[i].getY() == 1 || startNode.getY() - unvisitedNodes[i].getY() == -1)
                    && startNode.getX() - unvisitedNodes[i].getX() == 0 && startNode.getNodePastThrough() != unvisitedNodes[i]) {
                        nearestNeighbours.push(unvisitedNodes[i]);
                    }
                    // else if ((startNode.getY() - unvisitedNodes[i].getY() == 1 || startNode.getY() - unvisitedNodes[i].getY() == -1)
                    // && (startNode.getX() - unvisitedNodes[i].getX() == 1 || startNode.getX() - unvisitedNodes[i].getX() == -1)
                    // && startNode.getNodePastThrough() != unvisitedNodes[i]) {
                    //     nearestNeighbours.push(unvisitedNodes[i]);
                    // }
                }
            }
            for (let i = 0; i < nearestNeighbours.length; i++) {
                //finding number of edges on nearest neighbour
                numberOfEdges = 3;
                if ((nearestNeighbours[i].getX() == 9 || nearestNeighbours[i].getX() == this.grid.getX())) {
                    if (nearestNeighbours[i].getY() != 0 || nearestNeighbours[i].getY() != this.grid.getY()) {
                        numberOfEdges = 2;
                    }
                    else {
                        numberOfEdges = 1;
                    }
                }
                else if ((nearestNeighbours[i].getY() == 0 || nearestNeighbours[i].getY() == this.grid.getY())) {
                    if (nearestNeighbours[i].getX() != 9 || nearestNeighbours[i].getX() != this.grid.getX()) {
                        numberOfEdges = 2;
                    }
                    else {
                        numberOfEdges = 1;
                    }
                }
                let altNumberOfEdges = numberOfEdges + startNode.getNumberOfEdges();
                let distanceX = nearestNeighbours[i].getX() - startNode.getX();
                let distanceY = nearestNeighbours[i].getY() - startNode.getY();
                let distance = ((distanceX**2) + (distanceY**2))**0.5;
                let totalDistance = distance + startNode.getDistance();
                // console.log(`Current distance: ${dist}`);
                // console.log(`Total distance ${totalDistance}`);
                // console.log(`Distance of nearest neighbour: ${distance}`);
                // console.log(`NodeX: ${nearestNeighbours[i].getX()}, NodeY: ${nearestNeighbours[i].getY()}, number of edges: ${numberOfEdges}`);
                // console.log(`Total number of edges: ${altNumberOfEdges}`);
                if (nearestNeighbours[i].getDistance() == totalDistance) {
                    // console.log(`Current edges: ${nearestNeighbours[i].getNumberOfEdges()}`);
                    // console.log(`alternative edges: ${altNumberOfEdges}`);
                    if (nearestNeighbours[i].getNumberOfEdges() > altNumberOfEdges) {
                        nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                        nearestNeighbours[i].setNodePastThrough(startNode);
                    }
                    //dist = totalDistance;
                    // console.log("Number of edges is less");
                    nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                    //nearestNeighbours[i].setDistance(totalDistance);
                    //nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                    nearestNeighbours[i].addNodePastThrough(startNode);
                }
                else if (nearestNeighbours[i].getDistance() > totalDistance) {
                    nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                    //dist = totalDistance;
                    this.totNumberOfEdges = altNumberOfEdges;
                    nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                    nearestNeighbours[i].setDistance(totalDistance);
                    nearestNeighbours[i].addNodePastThrough(startNode);
                    nearestNeighbours[i].setNodePastThrough(startNode);
                }
                else {
                    // console.log("Node was not added to shortest path");
                }
            }
            startNode.setVisitStatus(true);
            this.visitedNodes.push(startNode);
            unvisitedNodes.splice(unvisitedNodes.indexOf(startNode),1);
            unvisitedNodes.sort((a,b) => (((a.getDistance() > b.getDistance())) ? 1 : -1));
            //startNode = unvisitedNodes[0];
            //console.log(...unvisitedNodes);
        }
        //this.performDijkstra(startNode);
    // }
}

export {Logic};