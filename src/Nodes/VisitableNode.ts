import {Node} from "./Node";

class VisitableNode extends Node {
    private distance: number;
    private visitStatus: boolean;
    private status: string;
    private numberOfEdges: number;
    private nodesPastThrough: Array<VisitableNode> = [];
    private nodePastThrough: VisitableNode;
    constructor(id: number, x: number, y: number) {
        super(id, x, y);
        this.status = "";
    }
    getDistance(): number {
        return this.distance;
    }
    setDistance(distance: number): void {
        this.distance = distance;
    }
    getVisitStatus(): boolean {
        return this.visitStatus;
    }
    setVisitStatus(status: boolean): void {
        this.visitStatus = status;
    }
    setStatus(status: string): void {
        this.status = status;
    }
    getStatus(): string {
        return this.status;
    }
    getNumberOfEdges(): number {
        return this.numberOfEdges;
    }
    setNumberOfEdges(edges: number) {
        edges = this.numberOfEdges;
    }
    setNodePastThrough(nodeIn: VisitableNode): void {
        this.nodePastThrough = nodeIn;
    }
    getNodePastThrough(): VisitableNode {
        return this.nodePastThrough;
    }
    getNodesPastThrough(): Array<VisitableNode> {
        return this.nodesPastThrough;
    }
    addNodePastThrough(node: VisitableNode): void {
        this.nodesPastThrough.push(node);
    }
}

export {VisitableNode};