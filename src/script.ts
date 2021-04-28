import {Draw} from "./Draw";
import { Grid } from "./Grid";
import {Node} from "./Node";
import { Wall } from "./Wall";
import {Object} from "./Object";
import {Logic} from "./logic";
import { Application } from "./Application";

let grid: Grid = new Grid(45,20);

let app: Application = new Application(grid);

app.startApplication();

// let draw = new Draw();

// let grid = new Grid(10,10);

// draw.drawGrid(grid);

// // console.log(grid.getSquares());

// let logic = new Logic(grid);

// let unvisitedNodes: Array<Node> = <Array<Node>>logic.getUnvisitedNodes();

// // grid.selectNode(2);
// // draw.highlightNode(2, "red");
// // let mainBody = document.querySelector("#main");
// // console.log(mainBody);

// let visitedNodes: Array<Node> = [];

// //console.log(...unvisitedNodes);
// let currentNode: Node = unvisitedNodes[0]
// currentNode.setStatus("S");
// for (let i = 0; i < unvisitedNodes.length; i++) {
//     if (unvisitedNodes[i].getStatus() == "S") {
//         unvisitedNodes[i].setDistance(0);
//     }
//     else {
//         unvisitedNodes[i].setDistance(Infinity);
//     }
// }
// unvisitedNodes[85].setStatus("F");
// while (currentNode.getStatus() != "F") {
//     logic.performDijkstra(currentNode, unvisitedNodes, visitedNodes);
//     //console.log(visitedNodes);
//      //console.log(...unvisitedNodes);
//     currentNode = unvisitedNodes[0];
// }
// visitedNodes.push(currentNode);
// console.log(visitedNodes);

// let finalNode = visitedNodes[visitedNodes.length-1];

// let shortestPath = [];

// while (finalNode.getNodePastThrough().getStatus() != "S") {
//     shortestPath.push(finalNode);
//     finalNode = finalNode.getNodePastThrough();
// }
// shortestPath.push(finalNode);
// shortestPath.push(finalNode.getNodePastThrough());
// //console.log(shortestPath);

// for (let i = 0; i < shortestPath.length; i++) {
//     draw.highlightSquare(shortestPath[i].getId(), "blue");
// }
// let unvisitedNodes: Array<Object> = [];

// for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 30; j++) {
//         unvisitedNodes.push(new Node(j, i, (30 * i) + j));
//     }
// }
// for (let i = 4; i < 5; i++) {
//     for (let j = 0; j < 20; j++) {
//         unvisitedNodes.push(new Wall(j, i, (30 * i) + j));
//     }
// }
// for (let i = 4; i < 5; i++) {
//     for (let j = 20; j < 30; j++) {
//         unvisitedNodes.push(new Node(j, i, (30 * i) + j));
//     }
// }
// for (let i = 5; i < 30; i++) {
//     for (let j = 0; j < 30; j++) {
//         unvisitedNodes.push(new Node(j, i, (30 * i) + j));
//     }
// }

// for (let i = 0; i < unvisitedNodes.length; i++) {
//     if (unvisitedNodes[i].getType() == "wall") {
//         draw.highlightNode(i, "green");
//     }
// }
// for (let i = 0; i < unvisitedNodes.length; i++) {
//     unvisitedNodes[i].setStatus("");
// }

// unvisitedNodes[0].setStatus("S");
// unvisitedNodes[510].setStatus("F");
// for (let i = 0; i < unvisitedNodes.length; i++) {
//     if (unvisitedNodes[i].getStatus() == "S") {
//         unvisitedNodes[i].setDistance(0);
//     }
//     else {
//         unvisitedNodes[i].setDistance(Infinity);
//     }
// }

// console.log(unvisitedNodes);


// function algorithm(node: Node, unvisitedNodes: Array<Node>, visitedNodes: Array<Node>) {
//     let nearestNeighbours = [];
//     for (let i = 0; i < unvisitedNodes.length; i++) {
//         if (unvisitedNodes[i].getType() != "wall") {
//             if ((node.getX() - unvisitedNodes[i].getX() == 1 || node.getX() - unvisitedNodes[i].getX() == -1)
//             && node.getY() - unvisitedNodes[i].getY() == 0 && node.getNodePastThrough() != unvisitedNodes[i]) {
//                 nearestNeighbours.push(unvisitedNodes[i]);
//             }
//             else if ((node.getY() - unvisitedNodes[i].getY() == 1 || node.getY() - unvisitedNodes[i].getY() == -1)
//             && node.getX() - unvisitedNodes[i].getX() == 0 && node.getNodePastThrough() != unvisitedNodes[i]) {
//                 nearestNeighbours.push(unvisitedNodes[i]);
//             }
//             for (let i = 0; i < nearestNeighbours.length; i++) {
//                 let distanceX = nearestNeighbours[i].getX() - node.getX();
//                 let distanceY = nearestNeighbours[i].getY() - node.getY();
//                 let distance = ((distanceX**2) + (distanceY**2))**0.5;
//                 let totalDistance = distance + node.getDistance();
//                 if (totalDistance < nearestNeighbours[i].getDistance()) {
//                     nearestNeighbours[i].setDistance(totalDistance);
//                     nearestNeighbours[i].setNodePastThrough(node);
//                 }
//             }
//         }
//     }
//     node.setVisitStatus(true);
//     visitedNodes.push(node);
//     unvisitedNodes.splice(unvisitedNodes.indexOf(node),1);
    //unvisitedNodes.shift();
//     unvisitedNodes.sort((a,b) => (a.getDistance() > b.getDistance() ? 1 : -1));
// }

//console.log(unvisitedNodes);
// unvisitedNodes.sort((a,b) => (a.getDistance() > b.getDistance() ? 1 : -1));

// let currentNode = unvisitedNodes[0];

// while (currentNode.getStatus() != "F") {
//     algorithm(currentNode, unvisitedNodes, visitedNodes);
//     currentNode = unvisitedNodes[0];
// }
// visitedNodes.push(currentNode);
// let finalNode = visitedNodes[visitedNodes.length-1];

// let shortestPath = [];

// while (finalNode.getNodePastThrough().getStatus() != "S") {
//     shortestPath.push(finalNode);
//     finalNode = finalNode.getNodePastThrough();
// }
// shortestPath.push(finalNode);
// shortestPath.push(finalNode.getNodePastThrough());
// console.log(shortestPath);


// for (let i = 0; i < shortestPath.length; i++) {
//     draw.highlightNode(shortestPath[i].getId(), "blue");
// }

// currentNode = unvisitedNodes[0];
// algorithm(currentNode, unvisitedNodes);

// console.log(visitedNodes);