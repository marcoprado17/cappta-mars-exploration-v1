class ProbeState {
    id;
    x;
    y;
    direction;

    constructor({
        id,
        x,
        y,
        direction,
    }) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
}

export default ProbeState;
