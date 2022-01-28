import React from 'react'; //this is imported from the npm modules installation we did
/**now we will create a component. EVERY component we use is it's own 'class'.
 * Each class needs at least ONE method within its {}s, and this is called a 'Render'.
 * This determines what elements are rendered out to the html page
 */
import {render} from 'react-dom'; /**we need to import this so we can render data to the html page */
import StorePicker from './components/StorePicker'; //this imports the required Component, DO NOT NEED '.js'
import App from './components/App'
import Router from './components/Router'

import './css/style.css'; //this is where we import CSS file

/**class StorePicker extends React.Component {

    render() {
        return <p>hello</p>
    }
} */

//WE SAVE EACH CLASS COMPONENT IN A SEPARATE FILE. See StorePicker.js in src/components


render(<Router />, document.querySelector("#main"));//note the self-closing
/**note about the above render menthod:
 * creating the component "StorePicker" allows it to be used as a tag argument in the render method, along
 * with the element which we would like the component to be rendered to.
  */