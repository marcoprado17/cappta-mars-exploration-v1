import { 
    Container, 
} from "react-bootstrap";
import CustomNavbar from './CustomNavbar';

function Layout({children}) {
    return (
        <Container>
            <CustomNavbar/>
            {children}
        </Container>
    );
}

export default Layout;
