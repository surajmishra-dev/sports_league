import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllTeamsComponent from "./Components/AllTeamsComponent";
import AllPlayersComponent from "./Components/AllPlayersComponent";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/players" component={AllPlayersComponent} />
        <Route exact path="/" component={AllTeamsComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
