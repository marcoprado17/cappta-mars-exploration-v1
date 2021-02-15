import MarsState from './MarsState';
import ProbeState from './ProbeState';

class MarsSimulation {
    states;
    inputInfo;

    constructor(inputInfo) {
        this.inputInfo = inputInfo;
        const initialState = new MarsState({
            t: 0,
            probes: {}
        });
        this.states = [initialState];
    }

    // Returns if it's a valid probe initial position
    addProbe(probeInfo) {
        const currState = this.states[this.states.length-1];
        const newStateCandidate = {
            t: currState.t + 1,
            probes: {
                ...currState.probes,
                [probeInfo.id]: new ProbeState({
                    id: probeInfo.id,
                    x: probeInfo.probeInitialX,
                    y: probeInfo.probeInitialY,
                    direction: probeInfo.probeInitialDirection
                })
            }
        };
        if(this._hasProbeColisionWithProbeOrBorders(newStateCandidate, this.inputInfo.fieldDimensions)) {
            return false;
        } else {
            this.states.push(newStateCandidate);
            return true;
        }
    }

    // Updates states if the command is valid and returns if the command is valid
    processCommand(probeInfo, probeCommand) {
        const currState = this.states[this.states.length-1];
        const newStateCandidate = this._processCommand(currState, probeInfo.id, probeCommand);
        if(this._hasProbeColisionWithProbeOrBorders(newStateCandidate, this.inputInfo.fieldDimensions)) {
            return false;
        } else {
            this.states.push(newStateCandidate);
            return true;
        }
    }

    // Returns the new state after command execution
    _processCommand(currState, probeId, command) {
        const currentProbeState = currState.probes[probeId];
        let newProbeState = {...currentProbeState};

        if(command === 'M') {
            if(currentProbeState.direction === 'N') {
                newProbeState.y = currentProbeState.y+1;
            } else if(currentProbeState.direction === 'E') {
                newProbeState.x = currentProbeState.x+1;
            } else if(currentProbeState.direction === 'S') {
                newProbeState.y = currentProbeState.y-1;
            } else if(currentProbeState.direction === 'W') {
                newProbeState.x = currentProbeState.x-1;
            }
        } else if(command === 'R') {
            if(currentProbeState.direction === 'N') {
                newProbeState.direction = 'E';
            } else if(currentProbeState.direction === 'E') {
                newProbeState.direction = 'S';
            } else if(currentProbeState.direction === 'S') {
                newProbeState.direction = 'W';
            } else if(currentProbeState.direction === 'W') {
                newProbeState.direction = 'N';
            }
        } else if(command === 'L') {
            if(currentProbeState.direction === 'N') {
                newProbeState.direction = 'W';
            } else if(currentProbeState.direction === 'E') {
                newProbeState.direction = 'N';
            } else if(currentProbeState.direction === 'S') {
                newProbeState.direction = 'E';
            } else if(currentProbeState.direction === 'W') {
                newProbeState.direction = 'S';
            }
        }

        return new MarsState({
            t: currState.t + 1,
            probes: {
                ...currState.probes,
                [probeId]: newProbeState
            }
        });
    }

    _hasProbeColisionWithProbeOrBorders(state, fieldDimensions) {
        let probePositionsDict = {};

        for(let id in state.probes) {
            const currProbeInfo = state.probes[id];

            if(currProbeInfo.x < 0 || currProbeInfo.x > fieldDimensions.maxX) {
                return true;
            }
            if(currProbeInfo.y < 0 || currProbeInfo.y > fieldDimensions.maxY) {
                return true;
            }

            if(probePositionsDict[currProbeInfo.x + '_' + currProbeInfo.y]) {
                return true;
            } else {
                probePositionsDict[currProbeInfo.x + '_' + currProbeInfo.y] = true;
            }
        }

        return false;
    }
}

export default MarsSimulation;
