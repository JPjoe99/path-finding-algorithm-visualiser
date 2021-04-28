import {Object} from "./Object";

class Wall extends Object {
    constructor(x: number, y: number, id: number) {
        super(x, y, id, "W");
    }
}

export {Wall};