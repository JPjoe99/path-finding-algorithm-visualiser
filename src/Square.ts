import {Node} from "./Node";
import { Wall } from "./Wall";
import {Object} from "./Object";

class Square {
    private id: number;
    private x: number;
    private y: number;
    private content: Object;
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
    getContent(): Object {
        return this.content;
    }
    setContent(content: Object): void {
        this.content = content;
    }
    placeNode(node: Node): void {
        this.content = node;
    }
    placeWall(wall: Wall): void {
        this.content = wall;
    }
}

export {Square};