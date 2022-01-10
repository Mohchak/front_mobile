import React, {useState} from 'react';
import {Chip, Typography} from "@mui/material";

function Ingredient(props) {

    const [product, setProduct] = useState(props.product)

    return (
        <React.Fragment>
            {
                product.ingredients && product.ingredients.map((ingredient, index) =>(
                    <Chip component="span" sx={{m: 0.1}} key={index} label={ingredient.ingredientName}/>
                ))
            }
        </React.Fragment>
    );
}

export default Ingredient;