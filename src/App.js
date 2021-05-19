import './App.css';
import Admin from './components/Admin';
import Items from './components/Items';
import My_Admin from './components/My_Admin';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path='/items'
        render={() => <Items />} />
      <Route path='/admin'
        render={() => <Admin />} />
    </div>
  );
}

export default App;
