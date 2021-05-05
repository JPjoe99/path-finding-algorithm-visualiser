import {Square} from "./Square";
import { VisitableNode } from "./Nodes/VisitableNode";
import { WallNode } from "./Nodes/WallNode";

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
                this.squares.push(new Square(j, i, id));
                this.squares[(xin * i) + j].setContent(new VisitableNode(id, j, i));
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
    getSquare(squareId: number): Square {
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].getId() == squareId) {
                return this.squares[i];
            }
        }
    }
    placeWallOnSquare(squareId: number): void {
        let selectedSquare: Square = this.getSquare(squareId);
        let x = selectedSquare.getX();
        let y = selectedSquare.getY();
        this.getSquare(squareId).setContent(new WallNode(squareId, x, y));
    }
}

export {Grid};