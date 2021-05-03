import {Node} from "./Node";
import {Square} from "./Square";

class Grid {
    private squares: Array<Square> = [];
    private x: number;
    private y: number;
    constructor(xin: number, yin: number) {
        this.x = xin;
        this.y = yin;
        for (let i = 0; i < yin; i++) {
            for (let j = 0; j < xin; j++) {
                let id: number = (xin * i) + j;
                // console.log(`x: ${j}, y: ${i}, id: ${id}`);
                this.squares.push(new Square(j, i, id));
                this.squares[(xin * i) + j].placeNode(new Node(j, i, id));
            }
        }
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getSquares(): Array<Square> {
        return this.squares;
    }
    getSquare(id: number): Square {
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].getId() == id) {
                return this.squares[i];
            }
        }
    }
    // selectNode(nodeId: number): void {
    //     for (let i = 0; i < this.nodes.length; i++) {
    //         if (this.nodes[i].getId() == nodeId) {
    //             this.nodes[i].setAsCurrentNode();
    //             console.log(this.nodes[i]);
    //         }
    //     }
    // }
}

export {Grid};