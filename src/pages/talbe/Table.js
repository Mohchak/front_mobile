import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getMenu} from "../../api/api";
import {
    isMobile, isDesktop
} from 'react-device-detect';
import {Button} from "@mui/material";


const styleButton1 = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2,
};

const styleButton2 = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2,
};

const styleButton3 = {
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2,
};

function Table(props) {

    const {tableId} = useParams()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        props.setTableId(tableId)
        getMenu(tableId).then( response => {
            if(response.status === 200) {
                if(response.data !== []){
                    console.log(response.data)
                    let menusTmp = [...response.data]
                    for(let indexMenu = 0; menusTmp[indexMenu]; indexMenu++){
                        for(let indexProduct = 0; menusTmp[indexMenu].products[indexProduct]; indexProduct++){
                            menusTmp[indexMenu].products[indexProduct].priceInt = menusTmp[indexMenu].products[indexProduct].price
                            menusTmp[indexMenu].products[indexProduct].priceF = menusTmp[indexMenu].products[indexProduct].price
                            menusTmp[indexMenu].products[indexProduct].choice = false
                            menusTmp[indexMenu].products[indexProduct].status = true
                            menusTmp[indexMenu].products[indexProduct].cpt = 0
                            menusTmp[indexMenu].products[indexProduct].productName = menusTmp[indexMenu].products[indexProduct].name
                            for(let indexIngredients = 0; menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients]; indexIngredients++){
                                if(menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].type){
                                    menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].type = 'none'
                                    menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].validate = true
                                }else{
                                    menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].type = 'choice'
                                    menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].validate = false
                                }
                                if(menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].statusChecked === false){
                                    menusTmp[indexMenu].products[indexProduct].choice = true
                                }
                                for(let indexChoice = 0; menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].choice[indexChoice]; indexChoice++){
                                    menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredients].choice[indexChoice].status = false;
                                }
                            }
                           
                        }
                    }
                    props.setMenus(menusTmp)
                    setLoading(true)
                }
                
            }
        })
            .catch(error => {
                console.log(error)
            })
    },[])

    return (
        <div>
            {
                isMobile && loading &&
                <div>
                    Language : {navigator.language}
                    {/* eslint-disable-next-line react/jsx-no-duplicate-props */}
                    <Link to="/menu">
                        <Button variant="outlined" sx={styleButton1} >Voir le menu</Button>
                    </Link>
                    <Button variant="outlined" sx={styleButton2} >Payer</Button>
                    <Button variant="outlined" sx={styleButton3} >Appler le serveur</Button>
                </div>
            }
            {
                isDesktop &&
                <div>
                    Is Desktop
                </div>
            }
        </div>
    );
}

export default Table;