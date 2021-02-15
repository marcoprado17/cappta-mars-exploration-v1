import {useState, useEffect} from 'react';
import styles from './RealTimeExploration.module.css';
import {
    Button
} from 'react-bootstrap';
import {
    BsFillCaretLeftFill,
    BsFillCaretRightFill
} from 'react-icons/bs';

function RealTimeExploration({
    states, 
    fieldDimensions
}) {
    const [currState, setCurrentState] = useState(1);

    useEffect(() => {
        setCurrentState(1);
    }, [states]);

    const xArray = [...Array(fieldDimensions.maxX+1).keys()];
    const yArray = [...Array(fieldDimensions.maxY+1).keys()];

    return (
        <div>
            <div>
                <Button className={styles.button} disabled={currState === 1} onClick={() => {
                    setCurrentState(currState-1);
                }}>
                    <BsFillCaretLeftFill/>
                </Button>
                <span className={styles.stepInfo}>{states.length === 0 ? '-/-' : `${currState}/${states.length}`}</span>
                <Button className={styles.button} disabled={states.length === 0 || currState === states.length} onClick={() => {
                    setCurrentState(currState+1);
                }}>
                    <BsFillCaretRightFill/>
                </Button>
            </div>
            <div className={styles.container} >
                {xArray.map((xIndex) => {
                    return (
                        <div key={xIndex} className={styles.rowContainer}>
                            {yArray.map((yIndexInverted) => {
                                const yIndex = yArray.length-1-yIndexInverted;

                                const state = states[currState-1];

                                let currPositionHasProbe = false;
                                let currPositionProbeDirection = undefined;

                                if(state) {
                                    for(let probeId in state.probes) {
                                        const probeInfo = state.probes[probeId];
    
                                        if(probeInfo.x === xIndex && probeInfo.y === yIndex) {
                                            currPositionHasProbe = true;
                                            currPositionProbeDirection = probeInfo.direction;
                                        }
                                    }
                                }

                                if(!currPositionHasProbe) {
                                    return (
                                        <img key={`${xIndex}_${yIndex}`} className={styles.terrainBlockImg} src='/img/mars-terrain.jpg'></img>
                                    )
                                } else if(currPositionProbeDirection === 'E') {
                                    return (
                                        <img key={`${xIndex}_${yIndex}`} className={styles.terrainBlockImg} src='/img/mars-terrain-probe-e.png'></img>
                                    )
                                } else if(currPositionProbeDirection === 'N') {
                                    return (
                                        <img key={`${xIndex}_${yIndex}`} className={styles.terrainBlockImg} src='/img/mars-terrain-probe-n.png'></img>
                                    )
                                } else if(currPositionProbeDirection === 'S') {
                                    return (
                                        <img key={`${xIndex}_${yIndex}`} className={styles.terrainBlockImg} src='/img/mars-terrain-probe-s.png'></img>
                                    )
                                } else if(currPositionProbeDirection === 'W') {
                                    return (
                                        <img key={`${xIndex}_${yIndex}`} className={styles.terrainBlockImg} src='/img/mars-terrain-probe-w.png'></img>
                                    )
                                }
                            })}
                            <br/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default RealTimeExploration;
