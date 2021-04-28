import {Object} from "./Object";

class Node extends Object {
    private distance: number;
    private visitStatus: boolean;
    private nodeThrough: Node;
    private status: string;
    constructor(xin: number, yin: number, id: number) {
        super(xin, yin, id, "N");
        this.visitStatus = false;
        this.status = "";
    }
    // setAsCurrentNode(): void {
    //     this.currentNode = true;
    // }
    setDistance(number: number): void {
        this.distance = number;
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