import React, {useEffect, useState} from 'react';
import {Data} from "../../data/data";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, Chip,
    Dialog, Divider,
    Fab, Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton, ListItemIcon,
    ListItemText, Paper, Slide, Stack, Toolbar,
    Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Ingredient from "../../component/Ingredient";
import * as PropTypes from "prop-types";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Link} from "react-router-dom";
const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 150,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));
const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 1,
    },
    '&:before': {
        display: 'none',
    },

}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(0),
        margin: 0,
    },
    padding: 0,
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function calculTotal(menusTmp) {

    let total = 0
    for(let indexMenu = 0; menusTmp[indexMenu]; indexMenu++) {
        for(let indexProduct = 0; menusTmp[indexMenu].products[indexProduct]; indexProduct++) {
            if(menusTmp[indexMenu].products[indexProduct].cpt > 0) {
                let totalProduct = 0
                if(menusTmp[indexMenu].products[indexProduct].choice === false && menusTmp[indexMenu].products[indexProduct].status){
                    totalProduct = totalProduct + menusTmp[indexMenu].products[indexProduct].priceInt * menusTmp[indexMenu].products[indexProduct].cpt
                } else if(menusTmp[indexMenu].products[indexProduct].status === false && menusTmp[indexMenu].products[indexProduct].choice === false){
                    totalProduct = totalProduct + menusTmp[indexMenu].products[indexProduct].priceInt
                    for(let indexIngredient = 0; menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient]; indexIngredient++){
                        if(menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient].type === 'none'){
                            if(menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient].validate){
                                totalProduct = totalProduct + menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient].price
                           }
                        } else {
                            for(let indexChoice = 0; menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient].choice[indexChoice]; indexChoice++){
                                if(menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient].choice[indexChoice].status){
                                    totalProduct = totalProduct + menusTmp[indexMenu].products[indexProduct].ingredients[indexIngredient].choice[indexChoice].price
                               }
                            }
                        }
                    }
                }
                total = total + totalProduct * menusTmp[indexMenu].products[indexProduct].cpt
            }
        }
    }
    return total;
}

function Menu(props) {

    const [menus, setMenus] = useState(props.menus)
    const [loading, setLoading] = useState(false)
    const [cpt, setCpt] = useState(props.cpt)
    const [cptProduct, setCptProduct] = useState(props.cptProduct)
    const [total, setTotal] = useState(props.total)
    useEffect(()=>{
        setLoading(true)
    },[])
    const [productDialog, setProductDialog] = useState({})
    const [expanded, setExpanded] = useState(false)
    const [open, setOpen] = useState(false)
    const [menusID, setMenusId] = useState()
    const [productId, setProductId] = useState()
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const addToCart = (menuId, productId) => {
        if(menus[menuId].products[productId].choice === true){
            handleClickOpen(menuId, productId)
        } else {
            let newMenu = [...menus]
            newMenu[menuId].products[productId].cpt =  newMenu[menuId].products[productId].cpt + 1
            setCptProduct(cptProduct + 1)
            setTotal(total + newMenu[menuId].products[productId].priceF)
            if(newMenu[menuId].products[productId].cpt === 1) {
                setCpt(cpt + 1)
            }
            setMenus(newMenu)
        }
    }

    const removeFromCart = (menuId, productId) => {
        let newMenu = [...menus]
        newMenu[menuId].products[productId].cpt =  newMenu[menuId].products[productId].cpt - 1
        setTotal(total - newMenu[menuId].products[productId].priceF)
        setCptProduct(cptProduct - 1)
        if(newMenu[menuId].products[productId].cpt === 0) {
            setCpt(cpt - 1)
            if(newMenu[menuId].products[productId].status === false) {
                newMenu[menuId].products.splice(productId,1)
            }
        }
        setMenus(newMenu)
    }

    const handleClickOpen = (menuId, productId) => {

        let ingredientsTmp = []
        for(let index = 0; menus[menuId].products[productId].ingredients[index]; index++ ){
            let ingredientTmp = {}
            if(menus[menuId].products[productId].ingredients[index].type !== 'choice'){
                ingredientTmp = {
                    status : menus[menuId].products[productId].ingredients[index].status,
                    type: menus[menuId].products[productId].ingredients[index].type,
                    ingredientName: menus[menuId].products[productId].ingredients[index].ingredientName,
                    price: menus[menuId].products[productId].ingredients[index].price,
                    validate: menus[menuId].products[productId].ingredients[index].validate,
                }
            } else {
                let choicesTmp = []
                for(let indexChoice = 0 ; menus[menuId].products[productId].ingredients[index].choices[indexChoice]; indexChoice++) {
                    let choiceTmp = {
                        choiceName: menus[menuId].products[productId].ingredients[index].choices[indexChoice].choiceName,
                        status: menus[menuId].products[productId].ingredients[index].choices[indexChoice].status,
                        price: menus[menuId].products[productId].ingredients[index].choices[indexChoice].price,
                    }
                    choicesTmp.push(choiceTmp)
                }
                ingredientTmp = {
                    status : menus[menuId].products[productId].ingredients[index].status,
                    type: menus[menuId].products[productId].ingredients[index].type,
                    ingredientName: menus[menuId].products[productId].ingredients[index].ingredientName,
                    validate: menus[menuId].products[productId].ingredients[index].validate,
                    choiceName: menus[menuId].products[productId].ingredients[index].choiceName,
                    choiceNbr : menus[menuId].products[productId].ingredients[index].choiceNbr,
                    choices : choicesTmp,
                }
            }
            ingredientsTmp.push(ingredientTmp)
        }

        let productDialogTmp = {
            id: menus[menuId].products[productId].id,
            productName: menus[menuId].products[productId].productName,
            priceInt: menus[menuId].products[productId].priceInt,
            priceF: menus[menuId].products[productId].priceF,
            image: menus[menuId].products[productId].image,
            description: menus[menuId].products[productId].description,
            choice: menus[menuId].products[productId].choice,
            cpt:menus[menuId].products[productId].cpt,
            status:menus[menuId].products[productId].status,
            ingredients: ingredientsTmp,
        }

        setProductDialog(productDialogTmp)
        setMenusId(menuId)
        setProductId(productId)
        setOpen(true)
    };

    const handleClose = () => {
        setProductDialog({})
        setOpen(false);
    };

    const checkBoxChange = (ingredientIndex, choiceIndex) => {

        let productDialogTmp = {...productDialog}
        productDialogTmp.ingredients[ingredientIndex].choices[choiceIndex].status = !productDialogTmp.ingredients[ingredientIndex].choices[choiceIndex].status
        if(productDialogTmp.ingredients[ingredientIndex].choices[choiceIndex].status){
            productDialogTmp.priceF = productDialogTmp.priceF + productDialogTmp.ingredients[ingredientIndex].choices[choiceIndex].price
        } else{
            productDialogTmp.priceF = productDialogTmp.priceF - productDialogTmp.ingredients[ingredientIndex].choices[choiceIndex].price
        }
        productDialogTmp.ingredients[ingredientIndex].validate = false
        for(let index = 0; productDialogTmp.ingredients[ingredientIndex].choices[index]; index++){
            if(productDialogTmp.ingredients[ingredientIndex].choices[index].status === true) {
                productDialogTmp.ingredients[ingredientIndex].validate = true
            }
        }
        setProductDialog(productDialogTmp)
    }

    const addProduct = () => {
        if(productDialog.choice === false){
    
            let newMenu =[...menus]
            newMenu[menusID].products[productId].cpt =  newMenu[menusID].products[productId].cpt + 1
            setCptProduct(cptProduct + 1)
            setTotal(total + newMenu[menusID].products[productId].priceF)
            if(newMenu[menusID].products[productId].cpt === 1) {
                setCpt(cpt + 1)
            }
            setMenus(newMenu)
            setOpen(false)
        } else {
            let validate = true
            for(let index = 0; productDialog.ingredients[index]; index++){
                if(productDialog.ingredients[index].status === true && productDialog.ingredients[index].type === 'choice' && productDialog.ingredients[index].validate === false){
                    validate = false
                }
            }
            if(validate){

                let boolean = true

                for(let index = 0; menus[menusID].products[index]; index++){
                    if(menus[menusID].products[index].id === productDialog.id){
                        if(JSON.stringify(menus[menusID].products[index].ingredients) === JSON.stringify(productDialog.ingredients)){
                            let newMenu = [...menus]
                            newMenu[menusID].products[index].cpt = newMenu[menusID].products[index].cpt + 1
                            setTotal(total + newMenu[menusID].products[index].priceF)
                            setCptProduct(cptProduct + 1)
                            setMenus(newMenu)
                            boolean = false
                            break;
                        }
                    }
                }

                if(boolean){
                    let productDialogTmp = {...productDialog}
                    productDialogTmp.cpt = productDialogTmp.cpt + 1
                    setCptProduct(cptProduct + 1)
                    setTotal(total + productDialogTmp.priceF)
                    if( productDialogTmp.cpt === 1) {
                        setCpt(cpt + 1)
                    }
                    productDialogTmp.choice = false
                    productDialogTmp.status = false
                    let newMenu =[...menus]
                    newMenu[menusID].products.splice(productId +1,0,productDialogTmp)
                    newMenu[menusID].products.join()
                    setMenus(newMenu)
                    setOpen(false)
                    setProductDialog({})
                }else {
                    setOpen(false)
                }

            }
        }
    }

    const update = () => {
        let productDialogTmp = {...productDialog}

        let newMenu = [...menus]

        let indexProductId = productId

        for(let index = 0; newMenu[menusID].products[index]; index++){
            if(index !== productId && JSON.stringify(menus[menusID].products[index].ingredients) === JSON.stringify(productDialog.ingredients)){
                productDialogTmp.cpt = productDialogTmp.cpt + menus[menusID].products[index].cpt
                if(productId > index){
                    newMenu[menusID].products.splice(productId,1)
                    indexProductId  = index
                }else{
                    newMenu[menusID].products.splice(index,1)
                }
                break;
            }
        }

        newMenu[menusID].products[indexProductId] = productDialogTmp
        setTotal(calculTotal(newMenu))
        setMenus(newMenu)
        setOpen(false)

    }
    
    const checkBoxChangeIngredient = (ingredientIndex) => {
        let productTmp = {...productDialog}
        productTmp.ingredients[ingredientIndex].validate = !productTmp.ingredients[ingredientIndex].validate
        if(productTmp.ingredients[ingredientIndex].validate){
            productTmp.priceF = productTmp.priceF + productTmp.ingredients[ingredientIndex].price
        }else{
            productTmp.priceF = productTmp.priceF - productTmp.ingredients[ingredientIndex].price
        }
        setProductDialog(productTmp)
    }

    const commandeClick = () => {
        props.setMenus(menus)
        props.setCpt(cpt)
        props.setCptProduct(cptProduct)
        props.setTotal(total)
    }

    return (
       <Box sx={{ width: '100%'}}>
           {loading && menus.map((menu, index1) => (
               <Accordion key={menu.productCategoryName} expanded={expanded === menu.panel} onChange={handleChange(menu.panel)}>
                   <AccordionSummary >
                       <ImageButton key={menu.productCategoryName} focusRipple >
                           <ImageSrc style={{ backgroundImage: `url(${menu.image})` }} />
                           <ImageBackdrop className="MuiImageBackdrop-root" />
                           <Image>
                               <Typography
                                   component="span"
                                   variant="subtitle1"
                                   color="inherit"
                                   sx={{
                                       position: 'relative',
                                       p: 4,
                                       pt: 2,
                                       pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                   }}
                               >
                                   {menu.productCategoryName}
                                   <ImageMarked className="MuiImageMarked-root" />
                               </Typography>
                           </Image>
                       </ImageButton>
                   </AccordionSummary>
                   <AccordionDetails>
                       <List dense>
                           {
                               menu.products.map((product, index2) => (
                                   <div key={index2}>
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
                                                   <Grid item xs={8} onClick={() => {handleClickOpen(index1, index2)}}>
                                                       <Typography sx={{ml:0}} >
                                                           {product.productName}
                                                       </Typography>

                                                   </Grid>
                                                   <Grid item xs={3} sx={{textAlign: 'right'}} onClick={() => {handleClickOpen(index1, index2)}}>
                                                       {product.priceF}.00 MAD
                                                   </Grid>
                                                   <Grid item xs={1} >
                                                       {
                                                           product.cpt > 0 &&
                                                           <IconButton onClick={() => {removeFromCart(index1, index2)}}>
                                                               <RemoveIcon />
                                                           </IconButton>
                                                       }
                                                   </Grid>
                                                   <Grid item xs={10} onClick={() => {handleClickOpen(index1, index2)}}>
                                                       <React.Fragment>
                                                           <Ingredient ingredients={product.ingredients}/>
                                                       </React.Fragment>
                                                   </Grid>
                                                   <Grid item xs={1}>
                                                       <IconButton  onClick={() => {addToCart(index1,index2)}}>
                                                           <AddIcon/>
                                                       </IconButton>
                                                   </Grid>
                                               </Grid>
                                           </Box>
                                       </ListItem>
                                       <Divider />
                                   </div>

                               ))
                           }
                       </List>
                   </AccordionDetails>

               </Accordion>

           ))
           }
           {
               loading && <Dialog
                   fullScreen
                   open={open}
                   onClose={handleClose}
                   TransitionComponent={Transition}
               >
                   <Card sx={{height: '100%'}}>
                       <IconButton aria-label="delete" sx={{position: 'absolute',}} onClick={() => {handleClose()}}>
                           <HighlightOffIcon />
                       </IconButton>
                       <CardMedia
                           component="img"
                           height="350"
                           image={productDialog.image}
                           alt="green iguana"
                       >
                       </CardMedia>
                       <CardContent>
                           <Box sx={{ flexGrow: 1, alignItems: 'center', textAlign: 'center',justifyContent: 'center' }} >
                               <Grid container spacing={0}>
                                   <Grid item xs={8} >
                                       <Typography gutterBottom variant="h5" component="div">
                                           {productDialog.productName}
                                       </Typography>
                                   </Grid>
                                   <Grid item xs={4} sx={{textAlign: 'right'}}>
                                       <Typography gutterBottom variant="h5" component="div">
                                           {productDialog.priceInt}.00 MAD
                                       </Typography>
                                   </Grid>
                               </Grid>
                           </Box>
                           <Typography variant="body2" color="text.secondary">
                               {productDialog.description}
                           </Typography>
                           <Divider />
                           {
                               productDialog.ingredients && productDialog.ingredients.map((ingredient, index1) => (
                                   <div key={index1}>
                                       {
                                           ingredient.status === false && ingredient.type === 'none' &&
                                           <Box  sx={{ flexGrow: 1, alignItems: 'center'  }}>
                                               <Grid container spacing={0}>
                                                   <Grid item xs={10} >
                                                       {ingredient.ingredientName}
                                                   </Grid>
                                                   <Grid item xs={2} sx={{textAlign: 'right'}}>
                                                       <Checkbox  checked={ingredient.validate} onChange={() => {checkBoxChangeIngredient(index1)}} />
                                                   </Grid>
                                               </Grid>
                                           </Box>
                                       }
                                       {
                                           ingredient.type === 'choice' &&
                                           <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                                               <Typography> {ingredient.ingredientName} </Typography>
                                               {
                                                   ingredient.choices && ingredient.choices.map((choice, index2) => (
                                                       <Box key={index2}  sx={{ flexGrow: 1, alignItems: 'center' }}>
                                                           <Grid container spacing={0}>
                                                               <Grid item xs={10} >
                                                                   <Box  sx={{ flexGrow: 1 }}>
                                                                       <Grid container spacing={0}>
                                                                           <Grid item xs={10} >
                                                                               {choice.choiceName}
                                                                           </Grid>
                                                                           <Grid item xs={2} sx={{textAlign: 'right'}}>
                                                                               {
                                                                                   choice.price !== undefined && choice.price > 0 &&
                                                                                   choice.price
                                                                               }
                                                                           </Grid>
                                                                       </Grid>
                                                                   </Box>
                                                               </Grid>
                                                               <Grid item xs={2} sx={{textAlign: 'right'}}>
                                                                   <Checkbox  checked={choice.status} onChange={() => checkBoxChange(index1, index2)}/>
                                                               </Grid>
                                                           </Grid>
                                                       </Box>
                                                   ))
                                               }
                                           </Box>
                                       }
                                       <Divider />
                                   </div>

                               ))
                           }

                       </CardContent>
                       <CardActions sx={{width: 'auto'}}>
                           <Button size="medium" color="success" sx={{width:'100%', textAlign: 'center', border:1,borderRadius:5, position:'relative',}} onClick={() => addProduct()}>
                               <IconButton component="span"/>
                               Ajouter pour {productDialog.priceF}.00 MAD
                           </Button>
                           {
                               productDialog.status === false &&
                               <Button size="medium" color="success" sx={{width:'100%', textAlign: 'center', border:1,borderRadius:5, position:'relative',}} onClick={() => update()}>
                                   <IconButton component="span"/>
                                   Update
                               </Button>
                           }
                       </CardActions>
                   </Card>
               </Dialog>
           }

           {
               cpt !== 0 &&
               <Link to={"/commande"}>
                   <Fab aria-label="CheckOut" color="primary" sx={{ position: 'fixed', bottom: '3%',right: '2%', zIndex: 1}} onClick={() => {commandeClick()}}>
                       <Badge badgeContent={cpt} color="success">
                           <ShoppingCartIcon />
                       </Badge>
                   </Fab>
               </Link>

           }

       </Box>
    );
}

export default Menu;