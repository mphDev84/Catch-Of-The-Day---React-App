import React from 'react';
import PropTypes from "prop-types";//separate package from React - there are other ways too, FB's Flow etc 

/**The below code utilizes an arrow function syntax to code a header component. It is called
 * a STATELESS FUNCTIONAL COMPONENT Note the difference between this and the further code below. Where
 * '({tagline, age})' is used, we can also write ({props}), and then write '{props.tagline}' below etc.
 * WE USE THESE STATELESS COMPONENTS when it is just a component that received some prop data and spits
 * it back out. Saves a little on efficiency. We still need to write components the other way if they do 
 * more than this.
 */
const Header = ({tagline, age})=> ( //destructuring the props gives us these two variables to use
        <header className="top">
            <h1>
            Catch 
            <span className="ofThe">
                <span className ="of">Of</span>
                <span className="the">The</span>
            </span>
            Day
            </h1>
            <h3 className="tagline">
            <span>{tagline}</span>{/**we want to make this DYNAMIC so we can change at any time, 
                                            see App.js */}
    </h3>
    </header>
    );

    //this code below basically checks that the data being passed via props as 'tagline' is a string.
    //this is prop data-validation for STATELESS FUNCTIONAL COMPONENTS like the above. See Fish.js for 
    //info on how to code STATIC prop types
Header.propTypes ={
    tagline: PropTypes.string.isRequired
};




/** 
class Header extends React.Component{
    render() {
        return (

        <React.Fragment>
        <header className="top">
            <h1>
            Catch 
            <span className="ofThe">
                <span className ="of">Of</span>
                <span className="the">The</span>
            </span>
            Day
            </h1>
            <h3 className="tagline">
            <span>{this.props.tagline}</span>{/**we want to make this DYNAMIC so we can change at any time, 
                                            see App.js *////}
/*    </h3>
    </header>
    </React.Fragment>

        )
    }
}
*/

export default Header;
/**NOTES: Looking at the code above (and App.js), we can see that we gave some data in object form
 * to the header element (tagline, age and our own made-up prop, cool). This data can be accessed in the 
 * Header.js file as you can see above. We need {}s since we revert to JS to call this data.
 * 
 * NOTE about '$r' - use this in dev tools, when a component is selected, go to the console and type in $r.
 * this will return all the info (props, state etc) regarding this selected react component (or any element). 
 * '$0' can be used in the same way for regular HTML elements.
 */