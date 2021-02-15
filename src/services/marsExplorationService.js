class MarsExplorationService {
    processInput(input) {
        const inputLines = this._extractInputLines(input);
        const fieldDimensions = this._extractFieldDimensions(inputLines);
        const probesInfos = this._extractProbesInfos(inputLines, fieldDimensions);
        const initialState = this._extractInitialState(probesInfos);
        const states = [initialState];
        console.log(initialState);
        for(let i = 0; i < probesInfos.length; i++) {
            const probeInfo = probesInfos[i];

            // Adding new state with current probe
            if(i > 0) {
                const currState = states[states.length-1];
                const newStateCandidate = {
                    t: currState.t + 1,
                    probes: {
                        ...currState.probes,
                        [probeInfo.id]: {
                            id: probeInfo.id,
                            x: probeInfo.probeInitialX,
                            y: probeInfo.probeInitialY,
                            direction: probeInfo.probeInitialDirection
                        }
                    }
                };
                if(this._hasProbeColisionWithProbeOrBorders(newStateCandidate, fieldDimensions)) {
                    // Ignoring the moves of this probe
                    continue;
                } else {
                    console.log(newStateCandidate);
                    states.push(newStateCandidate);
                }
            }

            for(let j = 0; j < probeInfo.probeCommands.length; j++) {
                const probeCommand = probeInfo.probeCommands[j];
                const currState = states[states.length-1];
                const newStateCandidate = this._processCommand(currState, probeInfo.id, probeCommand);
                if(this._hasProbeColisionWithProbeOrBorders(newStateCandidate, fieldDimensions)) {
                    // Ignoring the moves of this probe
                    break;
                } else {
                    console.log(newStateCandidate);
                    states.push(newStateCandidate);
                }
            }
        }
        return {
            states,
            fieldDimensions
        };
    }

    _extractInputLines(input) {
        return input.split('\n');
    }

    _extractFieldDimensions(inputLines) {
        const error = new Error('Can\'t extract field dimensions.');
        if(inputLines.length === 0) {
            throw error;
        }
        const firstLineSplited = inputLines[0].split(' ');
        if(firstLineSplited.length < 2) {
            throw error;
        }
        for(let i = 0; i < 2; i++) {
            if(isNaN(parseInt(firstLineSplited[i]))) {
                throw error;
            }
        }
        return {
            maxX: parseInt(firstLineSplited[0]),
            maxY: parseInt(firstLineSplited[1])
        };
    }

    _extractProbesInfos(inputLines, fieldDimensions) {
        const error = new Error('Can\'t extract probes commands or it has invalid data.');
        const hasAtLeastOneProbe = inputLines.length >= 3;
        const eachProbeHas2LinesOfInfo = inputLines.length % 2 === 1;
        if(!hasAtLeastOneProbe || !eachProbeHas2LinesOfInfo) {
            throw error;
        }
        let probesInfos = [];
        for(let i = 1; i < inputLines.length; i+=2) {
            const probeLine1 = inputLines[i];
            const probeLine2 = inputLines[i+1];

            const probeLine1Splited = probeLine1.split(' ');
            if(probeLine1Splited.length < 3) {
                throw error;
            }
            const probeInitialX = parseInt(probeLine1Splited[0]);
            if(isNaN(probeInitialX)) {
                throw error;
            }
            const probeInitialY = parseInt(probeLine1Splited[1]);
            if(isNaN(probeInitialY)) {
                throw error;
            }
            const probeInitialDirection = probeLine1Splited[2];
            if(!this._isDirection(probeInitialDirection)) {
                throw error;
            }

            if(probeInitialX < 0 || probeInitialX > fieldDimensions.maxX) {
                throw error;
            }

            if(probeInitialY < 0 || probeInitialY > fieldDimensions.maxY) {
                throw error;
            }

            let probeCommands = [];
            for(let j = 0; j < probeLine2.length; j++) {
                const probeCommand = probeLine2[j];
                if(!this._isProbeCommand(probeCommand)) {
                    throw error;
                } else {
                    probeCommands.push(probeCommand)
                }
            }

            probesInfos.push({
                id: (i+1)/2,
                probeInitialX,
                probeInitialY,
                probeInitialDirection,
                probeCommands
            });
        }
        return probesInfos;
    }

    _isDirection(directionCandidate) {
        return directionCandidate === 'N'
            || directionCandidate === 'E'
            || directionCandidate === 'S'
            || directionCandidate === 'W';
    }

    _isProbeCommand(probeCommandCandidate) {
        return probeCommandCandidate === 'M'
            || probeCommandCandidate === 'R'
            || probeCommandCandidate === 'L';
    }

    _extractInitialState(probesInfos) {
        return {
            t: 0,
            probes: {
                [probesInfos[0].id]: {
                    id: probesInfos[0].id,
                    x: probesInfos[0].probeInitialX,
                    y: probesInfos[0].probeInitialY,
                    direction: probesInfos[0].probeInitialDirection
                }
            }
        };
    }

    _processCommand(currState, probeId, command) {
        const currentProbeInfo = currState.probes[probeId];
        let newProbeInfo = {...currentProbeInfo};

        if(command === 'M') {
            if(currentProbeInfo.direction === 'N') {
                newProbeInfo.y = currentProbeInfo.y+1;
            } else if(currentProbeInfo.direction === 'E') {
                newProbeInfo.x = currentProbeInfo.x+1;
            } else if(currentProbeInfo.direction === 'S') {
                newProbeInfo.y = currentProbeInfo.y-1;
            } else if(currentProbeInfo.direction === 'W') {
                newProbeInfo.x = currentProbeInfo.x-1;
            }
        } else if(command === 'R') {
            if(currentProbeInfo.direction === 'N') {
                newProbeInfo.direction = 'E';
            } else if(currentProbeInfo.direction === 'E') {
                newProbeInfo.direction = 'S';
            } else if(currentProbeInfo.direction === 'S') {
                newProbeInfo.direction = 'W';
            } else if(currentProbeInfo.direction === 'W') {
                newProbeInfo.direction = 'N';
            }
        } else if(command === 'L') {
            if(currentProbeInfo.direction === 'N') {
                newProbeInfo.direction = 'W';
            } else if(currentProbeInfo.direction === 'E') {
                newProbeInfo.direction = 'N';
            } else if(currentProbeInfo.direction === 'S') {
                newProbeInfo.direction = 'E';
            } else if(currentProbeInfo.direction === 'W') {
                newProbeInfo.direction = 'S';
            }
        }

        console.log(probeId, command, currentProbeInfo, newProbeInfo);

        return {
            t: currState.t + 1,
            probes: {
                ...currState.probes,
                [probeId]: newProbeInfo
            }
        }
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

const marsExplorationService = new MarsExplorationService();

export default marsExplorationService;
