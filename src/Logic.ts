import { Grid } from "./Grid";
import {Node} from "./Node";
import { Square } from "./Square";
import {Object} from "./Object";

class Logic {
    private grid: Grid;
    private unvisitedNodes: Array<Node> = [];
    private shortestPath: Array<Node> = [];
    private visitedNodes: Array<Node> = [];
    private startingNode: Node;
    private endingNode: Node;
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
        console.log(this.unvisitedNodes);
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
    }
    performDijkstra(startNode: Node): void {
    let unvisitedNodes = this.getUnvisitedNodes();
        let nearestNeighbours: Array<Node> = [];
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
            let distanceX = nearestNeighbours[i].getX() - startNode.getX();
            let distanceY = nearestNeighbours[i].getY() - startNode.getY();
            let distance = ((distanceX**2) + (distanceY**2))**0.5;
            let totalDistance = distance + startNode.getDistance();
            if (totalDistance < nearestNeighbours[i].getDistance()) {
                nearestNeighbours[i].setDistance(totalDistance);
                nearestNeighbours[i].setNodePastThrough(startNode);
            }
        }
        startNode.setVisitStatus(true);
        this.visitedNodes.push(startNode);
        unvisitedNodes.splice(unvisitedNodes.indexOf(startNode),1);
        unvisitedNodes.sort((a,b) => (a.getDistance() > b.getDistance() ? 1 : -1));
    }
}

export {Logic};