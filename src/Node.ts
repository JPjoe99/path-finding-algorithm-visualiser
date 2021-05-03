import {Object} from "./Object";

class Node extends Object {
    private distance: number;
    private visitStatus: boolean;
    private nodeThrough: Node;
    private nodesPastThrough: Array<Node> = [];
    private status: string;
    private numberOfEdges: number;
    constructor(xin: number, yin: number, id: number) {
        super(xin, yin, id, "N");
        this.visitStatus = false;
        this.status = "";
    }
    // setAsCurrentNode(): void {
    //     this.currentNode = true;
    // }
    getNodesPastThrough(): Array<Node> {
        return this.nodesPastThrough;
    }
    addNodePastThrough(node: Node): void {
        this.nodesPastThrough.push(node);
    }
    setDistance(number: number): void {
        this.distance = number;
    }
    setNumberOfEdges(number: number): void {
        this.numberOfEdges = number;
    }
    getNumberOfEdges(): number {
        return this.numberOfEdges;
    }
    setStatus(status: string): void {
        this.status = status;
    }
    getStatus(): string {
        return this.status;
    }
    // setStatus(string: string): void {
    //     this.status = string;
    // }
    setVisitStatus(status: boolean): void {
        this.visitStatus = status;
    }
    getVisitStatus(): boolean {
        return this.visitStatus;
    }
    // getStatus(): string {
    //     return this.status;
    // }
    getDistance(): number {
        return this.distance;
    }
    setNodePastThrough(nodeIn: Node): void {
        this.nodeThrough = nodeIn;
    }
    getNodePastThrough(): Node {
        return this.nodeThrough;
    }
}

export {Node};