class ProbeInfo {
    id;
    probeInitialX;
    probeInitialY;
    probeInitialDirection;
    probeCommands;

    constructor({
        id,
        probeInitialX,
        probeInitialY,
        probeInitialDirection,
        probeCommands
    }) {
        this.id = id;
        this.probeInitialX = probeInitialX;
        this.probeInitialY = probeInitialY;
        this.probeInitialDirection = probeInitialDirection;
        this.probeCommands = probeCommands;
    }
}

export default ProbeInfo;
