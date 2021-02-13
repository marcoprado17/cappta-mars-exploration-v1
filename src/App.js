import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Instructions from './pages/Instructions';
import Docs from './pages/Docs';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/instructions">
            <Instructions />
          </Route>
          <Route path="/docs">
            <Docs />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
