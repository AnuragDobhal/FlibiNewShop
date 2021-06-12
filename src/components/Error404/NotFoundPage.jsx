import React from 'react';
import { Link } from 'react-router-dom';
import './error.css';
// import PageNotFound from '../assets/images/PageNotFound';


class NotFoundPage extends React.Component{
    render(){
        return (
            <div className="container">
            {/* <img src={PageNotFound}  /> */}

            {/* <p style={{textAlign:"center"}}>

              <Link to="/">Go to Home </Link>
            </p> */}


<div id="main">
    	<div class="fof">
            <h2 className="err2">Opps!</h2>
        		<h1 className="err">Error 404,Seems you are lost</h1>
                <Link to="./">
            <button className="go">Go Home <span> &#9787;</span></button>
                </Link>
      
    	</div>
       
       
</div>

        </div>
            
        )
      
    }
}
export default NotFoundPage;