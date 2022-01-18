import React, {useEffect, useState} from 'react';
import {Chip, Typography} from "@mui/material";

function Ingredient(props) {

    const [ingredients, setIngredients] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let ingredientsTmp = []
        if(props.ingredients !== undefined){
            for(let index = 0; props.ingredients[index]; index++){
                let ingredientTmp = {}
                if(props.ingredients[index].type === 'none'){
                    if(props.ingredients[index].validate){
                        ingredientTmp = {name: props.ingredients[index].ingredientName}
                        ingredientsTmp.push(ingredientTmp)
                    }
                }else {
                    if(props.ingredients[index].validate === false){
                        ingredientTmp = {name: props.ingredients[index].ingredientName}
                        ingredientsTmp.push(ingredientTmp)
                    } else {
                        for(let indexChoice = 0; props.ingredients[index].choices[indexChoice]; indexChoice++){
                            if(props.ingredients[index].choices[indexChoice].status){
                                ingredientTmp = {name: props.ingredients[index].choices[indexChoice].choiceName}
                                ingredientsTmp.push(ingredientTmp)
                            }
                        }
                    }
                }
    
            }
        }
        
        setIngredients(ingredientsTmp)
        setLoading(true)
    }, [props.ingredients])

    return (
       <div>
           {
               loading === true && ingredients.map((ingredient, index) => (
                    <Chip key={index} component="span" label={ingredient.name}/>
               ))
           }
       </div>
    );
}

export default Ingredient;