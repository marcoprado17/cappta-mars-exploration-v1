import axios from 'axios';

class DocsService {
    async getDocsMarkdown() {
        const response = await axios.get('https://raw.githubusercontent.com/marcoprado17/cappta-mars-exploration-v1/main/README.md');
        if(response.status !== 200) {
            throw new Error('Failed to fetch docs');
        }
        return response.data;
    }
}

const docsService = new DocsService();

export default docsService;
