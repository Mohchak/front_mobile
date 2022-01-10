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

    useEffect(() => {
        props.setTableId(tableId)
        /*getMenu(tableId).then( response => {
            if(response.status === 200) {

            }
        })
            .catch(error => {
                console.log(error)
            })*/
    },[])

    return (
        <div>
            {
                isMobile &&
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