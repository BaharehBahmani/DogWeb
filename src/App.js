import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BreedDetails from './pages/BreedDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/breeds/:breedName" component={BreedDetails} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
