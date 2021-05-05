import {Node} from "./Nodes/Node";

class Square {
    private id: number;
    private x: number;
    private y: number;
    private content: Node;
    constructor(xin: number, yin: number, id: number) {
        this.x = xin;
        this.y = yin;
        this.id = id;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getId(): number {
        return this.id;
    }
    getContent(): Node {
        return this.content;
    }
    setContent(content: Node): void {
        this.content = content;
    }
}

export {Square};