import { Grid } from "../Grid";
import { VisitableNode } from "../Nodes/VisitableNode";
import { Algorithm } from "./Algorithm";

class AStar extends Algorithm {
    constructor(grid: Grid) {
        super(grid);
    }
    calculateHeuristic(startNode: VisitableNode, currentNode: VisitableNode): number {
        let endingNode = this.getEndingNode();
        let endingNodex = endingNode.getX();
        let endingNodey = endingNode.getY();
        let currentNodex = currentNode.getX();
        let currentNodey = currentNode.getY();
        let startNodex = startNode.getX();
        let startNodey = startNode.getY();
        let cheapestPathEstimate = (((endingNodex - currentNodex)**2) + ((endingNodey - currentNodey)**2))**0.5;
        let cost = (((currentNodex - startNodex)**2) + ((startNodey - currentNodey)**2))**0.5;
        let heuristic = cheapestPathEstimate + cost;
        return heuristic;
    }
    getHeuristic(): number {
        return;
    }
    run(): Array<VisitableNode> {
        let currentNode = this.getStartingNode();
        while (this.getUnvisitedNodes()[0].getStatus() != "F") {
            this.runAlgorithm(currentNode);
            currentNode = this.getUnvisitedNodes()[0];
        }
        this.runAlgorithm(currentNode);
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
    runAlgorithm(node: VisitableNode): void {
        let unvisitedNodes = this.getUnvisitedNodes();
        let nearestNeighbours = this.findNearestNeighbours(node);
        let nearestNeighbourHeuristics = [];
        for (let i = 0; i < nearestNeighbours.length; i++) {
            //console.log(nearestNeighbours[i]);
            let heuristic = this.calculateHeuristic(node, nearestNeighbours[i]);
            let pair = { "neighbour": nearestNeighbours[i], "heuristic": heuristic};
            nearestNeighbourHeuristics.push(pair);
        }
        nearestNeighbourHeuristics.sort((a,b) => ((a.heuristic > b.heuristic) ? 1: -1));
        //if (nearestNeighbourHeuristics[0].heuristic > nearestNeighbourHeuristics[1].heuristic) {
            let chosenNearestNeighbour = nearestNeighbourHeuristics[0].neighbour;
            let distanceX = chosenNearestNeighbour.getX() - node.getX();
            let distanceY = chosenNearestNeighbour.getY() - node.getY();
            let distance = ((distanceX**2) + (distanceY**2))**0.5;
            let totalDistance = distance + node.getDistance();
            chosenNearestNeighbour.setDistance(totalDistance);
            chosenNearestNeighbour.addNodePastThrough(node);
            chosenNearestNeighbour.setNodePastThrough(node);
        //}
        // else if (nearestNeighbourHeuristics[0].heuristic == nearestNeighbourHeuristics[1].heuristic) {
        //     for (let i = 0; i < 2; i++) {
        //         let chosenNearestNeighbour = nearestNeighbourHeuristics[i].neighbour;
        //         let distanceX = chosenNearestNeighbour.getX() - node.getX();
        //         let distanceY = chosenNearestNeighbour.getY() - node.getY();
        //         let distance = ((distanceX**2) + (distanceY**2))**0.5;
        //         let totalDistance = distance + node.getDistance();
        //         chosenNearestNeighbour.setDistance(totalDistance);
        //         chosenNearestNeighbour.addNodePastThrough(node);
        //         chosenNearestNeighbour.setNodePastThrough(node);
        //     }
        // } 
        node.setVisitStatus(true);
        for (let i = 0; i < nearestNeighbours.length; i++) {
            if (nearestNeighbours[i] != chosenNearestNeighbour) {
                nearestNeighbours[i].setVisitStatus(true);
                this.getVisitedNodes().push(nearestNeighbours[i]);
            }
        }
        this.getVisitedNodes().push(node);
        unvisitedNodes.splice(unvisitedNodes.indexOf(node),1);
        unvisitedNodes.sort((a,b) => (((a.getDistance() > b.getDistance())) ? 1 : -1));
    }

}

export {AStar};