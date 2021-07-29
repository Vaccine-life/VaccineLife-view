import { Redirect, Route, Switch } from "react-router-dom";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import Medical from "../pages/Medical";
import Vaccine from "../pages/Vaccine";
import Write from "../pages/Write";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/vaccine" component={Vaccine} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/medical" component={Medical} />
        <Route path="/vboard/write" component={Write} />
        <Route path="/qboard/write" component={Write} />
        <Redirect from="*" to="/" />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
