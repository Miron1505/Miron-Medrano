import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import { Login } from './components/Login';
import { Admin } from './components/Administrador';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact={true} component={Inicio} />
        <Route path="/admin" exact={true} component={Admin} />
        <Route path="/login" exact={true} component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
