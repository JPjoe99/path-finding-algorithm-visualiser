import { Grid } from "../Grid";
import {Node} from "../Nodes/Node";
import { Square } from "../Square";
import { VisitableNode } from "../Nodes/VisitableNode";
import { WallNode } from "../Nodes/WallNode";

abstract class Algorithm {
    protected grid: Grid;
    protected unvisitedNodes: Array<VisitableNode> = [];
    protected shortestPath: Array<VisitableNode> = [];
    protected visitedNodes: Array<VisitableNode> = [];
    protected startingNode: VisitableNode;
    protected endingNode: VisitableNode;
    protected totNumberOfEdges: number;
    constructor(grid: Grid) {
        this.grid = grid;
        this.startingNode = null;
        this.endingNode = null;
        this.totNumberOfEdges = null;
        let gridSquares: Array<Square> = grid.getSquares();
        for (let i = 0; i < gridSquares.length; i++) {
            let squareContent = gridSquares[i].getContent();
            if (squareContent instanceof Node) {
                this.unvisitedNodes.push(<VisitableNode>squareContent);
            }
        }
        this.totNumberOfEdges = 0;
    }
    resetAlgorithm(startingNode: VisitableNode, endingNode: VisitableNode): void {
        this.resetShortestPath();
        this.resetUnvisitedNodes();
        this.resetVisitedNodes();
        this.setStartingNode(startingNode);
        this.setEndingNode(endingNode);
        this.setDistances();
        this.setNumberOfEdges();
    }
    getStartingNode(): VisitableNode {
        return this.startingNode;
    }
    setStartingNode(node: VisitableNode): void {
        if (this.startingNode != null) {
            this.startingNode.setStatus("");
            this.startingNode = node;
            this.startingNode.setStatus("S");
            return;
        }
        this.startingNode = node;
        this.startingNode.setStatus("S");
    }
    getEndingNode(): VisitableNode {
        return this.endingNode;
    }
    setEndingNode(node: VisitableNode): void {
        if (this.endingNode != null) {
            this.endingNode.setStatus("");
            this.endingNode = node;
            this.endingNode.setStatus("F");
            return;
        }
        this.endingNode = node;
        this.endingNode.setStatus("F");
    }
    getVisitedNodes(): Array<VisitableNode> {
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
            if (squareContent instanceof VisitableNode) {
                this.unvisitedNodes.push(<VisitableNode>squareContent);
            }
        }
        for (let i = 0; i < this.unvisitedNodes.length; i++) {
            this.unvisitedNodes[i].setVisitStatus(false);
        }
    }
    setShortestPath(shortestPath: Array<VisitableNode>): void {
        this.shortestPath = shortestPath;
    }
    resetShortestPath(): void {
        this.shortestPath = [];
    }
    getShortestPath(): Array<Node> {
        return this.shortestPath;
    }
    getUnvisitedNodes(): Array<VisitableNode> {
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
    findNearestNeighbours(node: VisitableNode): Array<VisitableNode> {
        let nearestNeighbours: Array<VisitableNode> = [];
        for (let i = 0; i < this.unvisitedNodes.length; i++) {
            if (!(this.unvisitedNodes[i] instanceof WallNode)) {
                if ((node.getX() - this.unvisitedNodes[i].getX() == 1 || node.getX() - this.unvisitedNodes[i].getX() == -1)
                && node.getY() - this.unvisitedNodes[i].getY() == 0 && node.getNodePastThrough() != this.unvisitedNodes[i]) {
                    nearestNeighbours.push(this.unvisitedNodes[i]);
                }
                else if ((node.getY() - this.unvisitedNodes[i].getY() == 1 || node.getY() - this.unvisitedNodes[i].getY() == -1)
                && node.getX() - this.unvisitedNodes[i].getX() == 0 && node.getNodePastThrough() != this.unvisitedNodes[i]) {
                    nearestNeighbours.push(this.unvisitedNodes[i]);
                }
            }
        }
        return nearestNeighbours;
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
            this.grid.placeWallOnSquare(i);
        }
    }
    abstract run(): Array<VisitableNode>;
    abstract runAlgorithm(startNode: VisitableNode): void;    
}

export {Algorithm};