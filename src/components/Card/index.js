import React from "react";
//import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
//Styles
import {Image} from './Card.styles';


const Card = ({image,busId,clickable,busName}) =>(

    <>   
    <div>
        {clickable ? (
            <Link to={`${busId}`} style={{textDecoration:'none'}}>
                <Image src={image} alt='thumb-of-card'/>
                <p>{busName}</p>
            </Link>
        ) : (
            <>
                <Image src={image} alt='thumb-of-card' />
                <p>{busName}</p>
            </>

        )}
    </div>
    </>
);


export default Card;