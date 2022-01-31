import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Avatar,
    Box, Button,
    Card,
    CardContent,
    CardHeader, Container, CssBaseline,
    Grid,
    IconButton,
    List,
    ListItem, TextField, Toolbar,
    Typography, useScrollTrigger
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Ingredient from "../../component/Ingredient";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "react-router-dom";
import { newCommande } from '../../api/api';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function Commande(props) {

    const [menus ,setMenus] = useState(props.menus)
    const [loading, setLoading] = useState(false)
    const [cptProduct, setCptProduct] = useState(props.cptProduct)
    const [allergies, setAllergies] = useState('')
    const [total, setTotal] = useState(props.total)
    const [cpt, setCpt] = useState(props.cpt)
    useEffect(()=>{
        if(cptProduct === 0 ){
            setLoading(false)
        }else{
            setLoading(true)
        }
        console.log(cptProduct)
        console.log('Total : ', total)
    }, [cptProduct])

    const handleDelete = () => {
        console.info('You clicked the delete icoon.');
    };

    const removeFromCart = (indexMenu, indexProduct) => {
        let newMenu = [...menus]
        newMenu[indexMenu].products[indexProduct].cpt = newMenu[indexMenu].products[indexProduct].cpt - 1
        setCptProduct(cptProduct - 1)
        if(newMenu[indexMenu].products[indexProduct].cpt === 0 ){
            setCpt(cpt - 1)
            if(newMenu[indexMenu].products.status === false){
                newMenu[indexMenu].products.splice(indexProduct,1)
            }
        }
        setMenus(menus)
        setTotal(total - newMenu[indexMenu].products[indexProduct].priceF)
    }

    const addToCart = (indexMenu, indexProduct) => {
        let newMenu = [...menus]
        newMenu[indexMenu].products[indexProduct].cpt = newMenu[indexMenu].products[indexProduct].cpt + 1
        setCptProduct(cptProduct + 1)
        setMenus(menus)
        setTotal(total + newMenu[indexMenu].products[indexProduct].priceF)

    }

    const toMenuClick = () => {
        props.setMenus(menus)
        props.setCptProduct(cptProduct)
        props.setTotal(total)
    }
    
    const validerCommand = () => {
        let productCommand = []
        
        for(let indexMenu = 0; menus[indexMenu]; indexMenu++ ){
            for(let indexProduct = 0; menus[indexMenu].products[indexProduct]; indexProduct++) {
                if(menus[indexMenu].products[indexProduct].cpt > 0) {
                    let ingredients = ''
                    for(let indexIngredient = 0; menus[indexMenu].products[indexProduct].ingredients[indexIngredient]; indexIngredient++){
                        if(menus[indexMenu].products[indexProduct].ingredients[indexIngredient].statusChecked === false) {
                            if(menus[indexMenu].products[indexProduct].ingredients[indexIngredient].validate){
                                if(menus[indexMenu].products[indexProduct].ingredients[indexIngredient].type === "none"){
                                    ingredients = ingredients + menus[indexMenu].products[indexProduct].ingredients[indexIngredient].ingredientName + ', '
                                } else {
                                    for(let indexChoice = 0; menus[indexMenu].products[indexProduct].ingredients[indexIngredient].choice[indexChoice]; indexChoice++){
                                        if(menus[indexMenu].products[indexProduct].ingredients[indexIngredient].choice[indexChoice].status){
                                            ingredients = ingredients + menus[indexMenu].products[indexProduct].ingredients[indexIngredient].choice[indexChoice].choiceName + ', '
                                        }
                                    }
                                }
                            }
                        }
                    }
                    productCommand.push({name:menus[indexMenu].products[indexProduct].productName, cpt:menus[indexMenu].products[indexProduct].cpt,ingredients: ingredients, tableId: props.tableId})
                }
            }
        }
        let data = {
            commandRequests: productCommand,
            tableId: props.tableId,
        }
        console.log(data)
        newCommande(data)
    }
    
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar sx={{bgcolor: 'gray'}}>
                    <Toolbar sx={{p:0}}>
                        <Link to="/menu">
                            <IconButton onClick={()=> {toMenuClick()}}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h6" component="div" sx={{color: 'black', ml:8}}>
                            Passage en caisse
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container sx={{p:0}}>
                {
                    loading &&
                    <Card sx={{ width : '100%', boxShadow: 0, mb:8}}>
                        <CardHeader
                            title="Votre Commande"
                        />
                        <CardContent sx={{p:0}}>
                            <List dense>
                                {
                                    menus.map((menu, indexMenu) => (
                                        <div key={indexMenu}>
                                            {
                                                menu && menu.products.map((product, indexProduct) => (
                                                    <div key={indexProduct}>
                                                        {
                                                            product.cpt > 0 &&
                                                            <ListItem sx={{p:0, m:0}}>
                                                                <Box sx={{ flexGrow: 1 }} >
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={1} sx={{textAlign: 'center'}}>
                                                                            {
                                                                                product.cpt > 0 &&
                                                                                <Typography>
                                                                                    {product.cpt}x
                                                                                </Typography>
                                                                            }
                                                                        </Grid>
                                                                        <Grid item xs={8} >
                                                                            <Typography sx={{ml:0}} >
                                                                                {product.productName}
                                                                            </Typography>

                                                                        </Grid>
                                                                        <Grid item xs={3} sx={{textAlign: 'right'}}>
                                                                            {product.priceF}.00 MAD
                                                                        </Grid>
                                                                        <Grid item xs={1} >
                                                                            {
                                                                                product.cpt > 0 &&
                                                                                <IconButton onClick={() => {removeFromCart(indexMenu, indexProduct)}}>
                                                                                    <RemoveIcon />
                                                                                </IconButton>
                                                                            }
                                                                        </Grid>
                                                                        <Grid item xs={10} >
                                                                            <React.Fragment>
                                                                                <Ingredient ingredients={product.ingredients}/>
                                                                            </React.Fragment>
                                                                        </Grid>
                                                                        <Grid item xs={1}>
                                                                            <IconButton  onClick={() => {addToCart(indexMenu, indexProduct)}}>
                                                                                <AddIcon/>
                                                                            </IconButton>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </ListItem>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </List>


                            <TextField sx={{width: '95%', ml:1, mr:1}} id="textArea" label="Des allergies?" multiline maxRows={5} value={allergies} onChange={(e) => {setAllergies(e.target.value)}}/>

                        </CardContent>


                    </Card>

                }
            </Container>
            <AppBar position="fixed" sx={{top:'auto', bottom: 0, bgcolor: 'gray'}}>
                <Toolbar sx={{width: '100%'}}>
                    {
                        loading && <Typography sx={{textAlign: 'center'}} onClick={() => validerCommand()}>
                        Valider
                        </Typography>
                    }

                </Toolbar>
            </AppBar>
        </React.Fragment>

    );
}

export default Commande;