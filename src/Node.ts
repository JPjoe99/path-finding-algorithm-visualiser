import {Object} from "./Object";

abstract class Node {
    private id: number;
    private x: number;
    private y: number;
    constructor(id: number, x: number, y: number) {
        this.id = id;
        this.x = x;
        this.y = y;
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
}

export {Node};