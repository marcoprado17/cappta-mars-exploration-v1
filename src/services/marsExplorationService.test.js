import marsExplorationService from './marsExplorationService';

it('returns the correct last state on case 1', () => {
    // prepare
    const input = 
`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

    // execute
    let {marsSimulation} = marsExplorationService.processInput(input);
    const states = marsSimulation.states;
    const lastState = states[states.length - 1];

    // assert
    expect(lastState.probes[1].x).toEqual(1);
    expect(lastState.probes[1].y).toEqual(3);
    expect(lastState.probes[1].direction).toEqual('N');
    expect(lastState.probes[2].x).toEqual(5);
    expect(lastState.probes[2].y).toEqual(1);
    expect(lastState.probes[2].direction).toEqual('E');
});
