import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    Form,
    Row,
    Col,
    Button,
    Alert
} from 'react-bootstrap';
import RealTimeExploration from "../components/RealTimeExploration";
import styles from './Home.module.css';
import marsExplorationService from '../services/marsExplorationService';

function Home() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [processingInput, setProcessingInput] = useState(false);
    const [showInputError, setShowInputError] = useState(false);
    const [states, setStates] = useState([]);
    const [fieldDimensions, setFieldDimensions] = useState({
        maxX: -1,
        maxY: -1
    });

    useEffect(() => {
        document.title = 'Mars Exploration | Home';
    }, []);
    
    return (
        <Layout>
            <Row className={styles.row}>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Input</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Enter input" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </Form.Group>
                        {
                            showInputError ?
                            <Alert variant="danger" onClose={() => setShowInputError(false)} dismissible>
                                <Alert.Heading>Input error!</Alert.Heading>
                                <p>
                                    Check if the input respect the instructions and try again.
                                </p>
                            </Alert>
                            :
                            null
                        }
                        <Button className={styles.processInputButton} disabled={processingInput} variant="primary" type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setProcessingInput(true);
                                setShowInputError(false);
                                try {
                                    const {inputInfo, marsSimulation} = marsExplorationService.processInput(input);
                                    const fieldDimensions = inputInfo.fieldDimensions;
                                    const states = marsSimulation.states;
                                    setStates(states);
                                    setFieldDimensions(fieldDimensions);
                                    const lastState = states[states.length-1];
                                    let tempResult = '';
                                    for(let probeId in lastState.probes) {
                                        const probeState = lastState.probes[probeId];
                                        tempResult += `${probeState.x} ${probeState.y} ${probeState.direction}\n`;
                                    }
                                    setResult(tempResult);
                                } catch(err) {
                                    console.warn(err);
                                    setShowInputError(true);
                                } finally {
                                    setProcessingInput(false);
                                }
                            }}
                        >
                            {processingInput ? 'Processing...' : 'Process Input'}
                        </Button>
                        <Form.Group>
                            <Form.Label>Output</Form.Label>
                            <Form.Control readOnly value={result} as="textarea" rows={3} placeholder="" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <RealTimeExploration states={states} fieldDimensions={fieldDimensions}/>
                </Col>
            </Row>
        </Layout>
    )
};

export default Home;
