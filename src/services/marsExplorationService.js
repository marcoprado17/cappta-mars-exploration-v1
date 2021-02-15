import InputInfo from '../mars_exploration/InputInfo';
import MarsSimulation from '../mars_exploration/MarsSimulation';

class MarsExplorationService {
    processInput(input) {
        const inputInfo = new InputInfo(input);
        const marsSimulation = new MarsSimulation(inputInfo);
        for(let i = 0; i < inputInfo.probesInfos.length; i++) {
            const probeInfo = inputInfo.probesInfos[i];

            // Adding new state with current probe
            const isValidProbePosition = marsSimulation.addProbe(probeInfo);
            if(!isValidProbePosition) {
                // Ignoring this probe
                continue;
            }

            for(let j = 0; j < probeInfo.probeCommands.length; j++) {
                const probeCommand = probeInfo.probeCommands[j];
                const isValidCommand = marsSimulation.processCommand(probeInfo, probeCommand);
                if(!isValidCommand) {
                    // Ignoring the next moves of this probe
                    break;
                }
            }
        }
        return {
            inputInfo,
            marsSimulation
        };
    }
}

const marsExplorationService = new MarsExplorationService();

export default marsExplorationService;
