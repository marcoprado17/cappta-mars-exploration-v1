import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import RealTimeExploration from "../components/RealTimeExploration";
import styles from './Home.module.css';

function Home() {
    const [input, setInput] = useState('');

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
                        <Button className={styles.processInputButton} variant="primary" type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Process Input
                        </Button>
                        <Form.Group>
                            <Form.Label>Output</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <RealTimeExploration/>
                </Col>
            </Row>
        </Layout>
    )
};

export default Home;
