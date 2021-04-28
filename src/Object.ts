abstract class Object {
    private id: number;
    private x: number;
    private y: number;
    private type: string;
    constructor(x: number, y: number, id: number, type: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
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
    getType(): string {
        return this.type;
    }
}

export {Object};