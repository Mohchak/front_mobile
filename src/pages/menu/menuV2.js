import React, {Component} from 'react';
import {Data} from "../../data/data";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
    Badge,
    Box, Button,
    Card, CardActions, CardContent, CardMedia, Checkbox,
    Chip,
    Dialog,
    Divider, Fab,
    Grid,
    IconButton,
    List,
    ListItem,
    Paper,
    Slide,
    Typography
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ingredient from "../../component/Ingredient";

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

class MenuV2 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menu : Data,
            expanded: false,
            cpt: 0,
            open: false,
            menusID: 0,
            productId: 0,
            productDialog: {}
        }
    }


    handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: (isExpanded ? panel : false)});
    }

    addToCart = (menuId, productId) => {
        if(this.state.menu[menuId].products[productId].choice === true){
            this.setState({open: true})
            let productDialogTmp = this.state.menu[menuId].products[productId]
            this.setState({productDialog: productDialogTmp})
            this.setState({menusID: menuId})
            this.setState({productId: productId})
        } else {
            this.state.menu[menuId].products[productId].cpt = this.state.menu[menuId].products[productId].cpt +1

            if(this.state.menu[menuId].products[productId].cpt === 1) {
                this.setState({cpt: this.state.cpt + 1})
            }
        }
    }

    removeFromCart = (menuId, productId) => {
        this.state.menu[menuId].products[productId].cpt = this.state.menu[menuId].products[productId].cpt - 1
        if(this.state.menu[menuId].products[productId].cpt === 0) {
            this.setState({cpt: this.state.cpt - 1})
        }
    }

    handleClickOpen = (menuId, productId) => {
        let item = {...this.state.menu[menuId].products[productId]}
        item ={...item,type:'tmp'}
        this.setState({productDialog: item})
        this.setState({menusId: menuId})
        this.setState({productId: productId})
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({productDialog: {}})
        this.setState({open: false})
    }

    checkBoxChange = (ingredientIndex, choiceIndex) => {

        let productTmp = this.state.productDialog
        this.state.productDialog.ingredients[ingredientIndex].choice[choiceIndex].status = !productTmp.ingredients[ingredientIndex].choice[choiceIndex].status
        this.state.productDialog.ingredients[ingredientIndex].validate = false
        for(let index = 0; this.state.productDialog.ingredients[ingredientIndex].choice[index]; index++){
            if(this.state.productDialog.ingredients[ingredientIndex].choice[index].status === true) {
                this.state.productDialog.ingredients[ingredientIndex].validate = true
            }
        }
    }

    addProduct = () => {

        if(this.state.productDialog.choice === false){
            this.state.menu[this.state.menusId].products[this.state.productId].cpt = this.state.menu[this.state.menusId].products[this.state.productId].cpt +1
            if(this.state.menu[this.state.menusId].products[this.state.productId].cpt === 1) {
                this.setState({cpt: this.state.cpt + 1})
            }
            this.setState({open: false})
        } else {
            let validate = true
            for(let index = 0; this.state.productDialog.ingredients[index]; index++){
                if(this.state.productDialog.ingredients[index].status === true && this.state.productDialog.ingredients[index].type === 'choice' && this.state.productDialog.ingredients[index].validate === false){
                    validate = false
                }
            }
            if(validate){
                this.state.menu[this.state.menusID].products.splice(this.state.productId +1,0,this.state.productDialog)
                this.state.menu[this.state.menusID].products.join()
                this.setState({open: false})
                this.setState({productDialog: {}})
            }
        }
    }

    checkBoxChangeIngredient = (ingredientIndex) => {
        let item = {...this.state.productDialog}
        item.ingredients[ingredientIndex].validate = !item.ingredients[ingredientIndex].validate
        this.setState({productDialog: item})
    }

    render() {
        console.log(this.state.menu[0].products[0])
        console.log(this.state.productDialog)
        return (<Box sx={{ width: '100%'}}>
                {this.state.menu.map((menu, index1) => (
                    <Accordion key={menu.productCategoryName} expanded={this.state.expanded === menu.panel} onChange={this.handleChange(menu.panel)}>
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
                                                        <Grid item xs={8} onClick={() => {this.handleClickOpen(index1, index2)}}>
                                                            <Typography sx={{ml:0}} >
                                                                {product.productName}
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item xs={3} sx={{textAlign: 'right'}} onClick={() => {this.handleClickOpen(index1, index2)}}>
                                                            {product.price}.00 MAD
                                                        </Grid>
                                                        <Grid item xs={1} >
                                                            {
                                                                product.cpt > 0 &&
                                                                <IconButton >
                                                                    <RemoveIcon onClick={() => {this.removeFromCart(index1, index2)}}/>
                                                                </IconButton>
                                                            }
                                                        </Grid>
                                                        <Grid item xs={10} onClick={() => {this.handleClickOpen(index1, index2)}}>
                                                            <React.Fragment>
                                                                {
                                                                    product.ingredients && product.ingredients.map((ingredient, index) =>(
                                                                        <Chip component="span" sx={{m: 0.1}} key={index} label={ingredient.ingredientName}/>
                                                                    ))
                                                                }
                                                            </React.Fragment>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <IconButton onClick={() => {this.addToCart(index1,index2)}}>
                                                                <AddIcon />
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
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <Card sx={{height: '100%'}}>
                        <IconButton aria-label="delete" sx={{position: 'absolute',}} onClick={() => {this.handleClose()}}>
                            <HighlightOffIcon />
                        </IconButton>
                        <CardMedia
                            component="img"
                            height="350"
                            image={this.state.productDialog.image}
                            alt="green iguana"
                        >
                        </CardMedia>
                        <CardContent>
                            <Box sx={{ flexGrow: 1, alignItems: 'center', textAlign: 'center',justifyContent: 'center' }} >
                                <Grid container spacing={0}>
                                    <Grid item xs={8} >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {this.state.productDialog.productName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{textAlign: 'right'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {this.state.productDialog.price}.00 MAD
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {this.state.productDialog.description}
                            </Typography>
                            <Divider />
                            {
                                this.state.productDialog.ingredients && this.state.productDialog.ingredients.map((ingredient, index1) => (
                                    <div key={index1}>
                                        {
                                            ingredient.status !== undefined && ingredient.status === false && ingredient.type === 'none' &&
                                            <Box  sx={{ flexGrow: 1, alignItems: 'center'  }}>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={10} >
                                                        {ingredient.ingredientName}
                                                    </Grid>
                                                    <Grid item xs={2} sx={{textAlign: 'right'}}>
                                                        <Checkbox  checked={ingredient.validate} onChange={() => {this.checkBoxChangeIngredient(index1)}} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        }
                                        {
                                            ingredient.status !== undefined && ingredient.status && ingredient.type === 'choice' &&
                                            <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                                                <Typography> {ingredient.ingredientName} </Typography>
                                                {
                                                    ingredient.choice && ingredient.choice.map((choice, index2) => (
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
                                                                    <Checkbox  checked={choice.status} onChange={() => this.checkBoxChange(index1, index2)}/>
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
                            <Button size="medium" color="success" sx={{width:'100%', textAlign: 'center', border:1,borderRadius:5, position:'relative',}} onClick={() => this.addProduct()}>
                                Ajouter pour {this.state.productDialog.price}.00 MAD
                            </Button>
                        </CardActions>
                    </Card>
                </Dialog>
                {
                    this.state.cpt !== 0 && <Fab aria-label="CheckOut" color="primary" sx={{ position: 'fixed', bottom: '3%',right: '2%', zIndex: 1}}>
                        <Badge badgeContent={this.state.cpt} color="success">
                            <ShoppingCartIcon />
                        </Badge>
                    </Fab>
                }

            </Box>
        );
    }

}

export default MenuV2;