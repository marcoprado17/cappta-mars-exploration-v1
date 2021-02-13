import axios from 'axios';

class InstructionsService {
    async getInstructions() {
        const response = await axios.get('https://gist.githubusercontent.com/rmterra/31f2b4f589250839550f685d8873d935/raw/52c7ff593fd8716dc29c67d2f4cc572ba83b6c79/sonda.md');
        if(response.status !== 200) {
            throw new Error('Failed to fetch instructions');
        }
        return response.data;
    }
}

const instructionsService = new InstructionsService();

export default instructionsService;
