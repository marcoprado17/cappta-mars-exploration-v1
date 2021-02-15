import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import instructionsService from '../services/instructionsService';
import ReactMarkdown from 'react-markdown';
import styles from './Instructions.module.css';

function Instructions() {
    const [errorOnFetchInstructions, setErrorOnFetchInstructions] = useState(false);
    const [loadingInstructions, setLoadingInstructions] = useState(true);
    const [instructionsMarkdown, setInstructionsMarkdown] = useState('');

    useEffect(async () => {
        document.title = 'Mars Exploration | Instructions';
        
        try {
            const tempInstructionsMarkdown = await instructionsService.getInstructions();
            setInstructionsMarkdown(tempInstructionsMarkdown);
            setLoadingInstructions(false);
        } catch(err) {
            console.warn(err);
            setErrorOnFetchInstructions(true);
            setLoadingInstructions(false);
        }
    }, []);
    
    if(errorOnFetchInstructions) {
        return (
            <Layout>
                Falha ao obter as instruções. Recarregue a página.
            </Layout>
        )
    } else if(loadingInstructions) {
        return (
            <Layout>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <ReactMarkdown className={styles.reactMarkdownContainer}>
                    {instructionsMarkdown}
                </ReactMarkdown>
            </Layout>
        )
    }
};

export default Instructions;
