import { Algorithm } from "./Algorithm";
import { Grid } from "../Grid";
import { VisitableNode } from "../Nodes/VisitableNode";
import { WallNode } from "../Nodes/WallNode";

class Dijkstra extends Algorithm {
    constructor(grid: Grid) {
        super(grid);
    }
    findNumberOfEdges(node: VisitableNode): number {
        let numberOfEdges = 3;
        if ((node.getX() == 9 || node.getX() == this.grid.getX())) {
            if (node.getY() != 0 || node.getY() != this.grid.getY()) {
                numberOfEdges = 2;
            }
            else {
                numberOfEdges = 1;
            }
        }
        else if ((node.getY() == 0 || node.getY() == this.grid.getY())) {
            if (node.getX() != 9 || node.getX() != this.grid.getX()) {
                numberOfEdges = 2;
            }
            else {
                numberOfEdges = 1;
            }
        }
        return numberOfEdges;
    }

    run(): Array<VisitableNode> {
        let currentNode = this.getStartingNode();
        while (this.getUnvisitedNodes()[0].getStatus() != "F") {
            this.runAlgorithm(currentNode);
            currentNode = this.getUnvisitedNodes()[0];
        }
        let finalNode = this.getEndingNode();
        let shortestPath = [];
        while (finalNode.getNodePastThrough().getStatus() != "S") {
            shortestPath.push(finalNode);
            finalNode = finalNode.getNodePastThrough();
        }
        shortestPath.push(finalNode);
        shortestPath.shift();
        shortestPath.push(finalNode.getNodePastThrough());   
        console.log(shortestPath);
        return shortestPath;
    }
    runAlgorithm(startNode: VisitableNode): void {
        let unvisitedNodes = this.getUnvisitedNodes();
        let nearestNeighbours: Array<VisitableNode> = this.findNearestNeighbours(startNode);
        let numberOfEdges: number = 4;
        // let currentNumberOfEdges = this.get totNumberOfEdges;
        for (let i = 0; i < nearestNeighbours.length; i++) {
            //finding number of edges on nearest neighbour
            numberOfEdges = this.findNumberOfEdges(nearestNeighbours[i]);
            let altNumberOfEdges = numberOfEdges + startNode.getNumberOfEdges();
            let distanceX = nearestNeighbours[i].getX() - startNode.getX();
            let distanceY = nearestNeighbours[i].getY() - startNode.getY();
            let distance = ((distanceX**2) + (distanceY**2))**0.5;
            let totalDistance = distance + startNode.getDistance();
            // if (nearestNeighbours[i].getDistance() == totalDistance) {
            //     // console.log(`Current edges: ${nearestNeighbours[i].getNumberOfEdges()}`);
            //     // console.log(`alternative edges: ${altNumberOfEdges}`);
            //     if (nearestNeighbours[i].getNumberOfEdges() > altNumberOfEdges) {
            //         nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
            //         nearestNeighbours[i].setNodePastThrough(startNode);
            //     }
            //     //dist = totalDistance;
            //     // console.log("Number of edges is less");
            //     nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
            //     //nearestNeighbours[i].setDistance(totalDistance);
            //     //nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
            //     nearestNeighbours[i].addNodePastThrough(startNode);
            // }
            if (nearestNeighbours[i].getDistance() > totalDistance) {
                nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                //dist = totalDistance;
                // this.totNumberOfEdges = altNumberOfEdges;
                nearestNeighbours[i].setNumberOfEdges(altNumberOfEdges);
                nearestNeighbours[i].setDistance(totalDistance);
                nearestNeighbours[i].addNodePastThrough(startNode);
                nearestNeighbours[i].setNodePastThrough(startNode);
            }
        }
        startNode.setVisitStatus(true);
        this.getVisitedNodes().push(startNode);
        unvisitedNodes.splice(unvisitedNodes.indexOf(startNode),1);
        unvisitedNodes.sort((a,b) => (((a.getDistance() > b.getDistance())) ? 1 : -1));
    }
}

export {Dijkstra};