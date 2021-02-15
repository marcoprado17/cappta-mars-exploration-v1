import { useEffect , useState} from "react";
import Layout from "../components/Layout";
import ReactMarkdown from 'react-markdown';
import docsService from '../services/docsService';
import styles from './Docs.module.css';

function Docs() {
    const [errorOnFetchDocs, setErrorOnFetchDocs] = useState(false);
    const [loadingDocs, setLoadingDocs] = useState(true);
    const [docsMarkdown, setDocsMarkdown] = useState('');
    
    useEffect(async () => {
        document.title = 'Mars Exploration | Docs';

        try {
            const tempDocsMarkdown = await docsService.getDocsMarkdown();
            setDocsMarkdown(tempDocsMarkdown);
            setLoadingDocs(false);
        } catch(err) {
            console.warn(err);
            setErrorOnFetchDocs(true);
            setLoadingDocs(false);
        }
    }, []);
    
    if(errorOnFetchDocs) {
        return (
            <Layout>
                Falha ao obter a documentação. Recarregue a página.
            </Layout>
        )
    } else if(loadingDocs) {
        return (
            <Layout>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <ReactMarkdown className={styles.reactMarkdownContainer}>
                    {docsMarkdown}
                </ReactMarkdown>
            </Layout>
        )
    }
};

export default Docs;
