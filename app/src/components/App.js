import React  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './Index';
import Login from './Login';

function App(){

    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/"><Login/></Route>
            <Route path="/Index"><Index/></Route>
        </Switch>
        </BrowserRouter>
    )
}

export default App;