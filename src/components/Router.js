/**THIS COMPONENT DEALS WITH ROUTING. I.e where we can navigate to on our React website */
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from './App';
import NotFound from './NotFound';

//now we build a Stateless Functional Component
const Router = ()=>(
    <BrowserRouter>
<Switch>
    <Route exact path="/" component={StorePicker}/>
<Route path="/store/:storeId" component={App}/> {/**this path is basically wesbos.com/store/*anystorename* */}
     <Route component={NotFound}/>
</Switch>
    </BrowserRouter>

)

/**NOTES ABOUT ABOVE: the Route path "/" is basically the homepage - ie. cathoftheday.wesbos.com/
 * this renders out the Store Picker component. The next Route renders out the App.js component
 */
export default Router; //DON'T FORGET THIS!!!