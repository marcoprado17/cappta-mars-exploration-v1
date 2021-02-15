import ProbeInfo from './ProbeInfo';

class InputInfo {
    inputLines;
    fieldDimensions;
    probesInfos;
    
    constructor(input) {
        this.inputLines = this._extractInputLines(input);
        this.fieldDimensions = this._extractFieldDimensions(this.inputLines);
        this.probesInfos = this._extractProbesInfos(this.inputLines, this.fieldDimensions);
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

            probesInfos.push(new ProbeInfo({
                id: (i+1)/2,
                probeInitialX,
                probeInitialY,
                probeInitialDirection,
                probeCommands
            }));
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
}

export default InputInfo;
