import React, {useEffect, useState} from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, Chip, Stack, Typography} from "@mui/material";

function Commande(props) {

    const [products ,setProducts] = useState()

    useEffect(()=>{
        let menuTmp = []
        for(let index1 = 0; props.menus[index1]; index1++){
            for(let index2 = 0; props.menus[index1].products[index2]; index2++){
                if(props.menus[index1].products[index2].cpt !==0){
                    for(let index3 = 0; index3 < props.menus[index1].products[index2].cpt; index3++){
                        menuTmp.push(props.menus[index1].products[index2])
                    }
                }
            }
        }
        setProducts(menuTmp)
    }, [])

    const handleDelete = () => {
        console.info('You clicked the delete icoon.');
    };


    return (
        <Card sx={{ width : '100%', boxShadow: 0,}}>
            <CardHeader
                title="Detail de la commande"
            />
            <CardContent>
                {
                    products && products.map((product, index) => (
                        <Stack direction="row" spacing={2} key={index} sx={{mb: 1}}>
                            <Avatar src={product.image} />
                            <Box>
                                <Typography >
                                    {product.productName}
                                </Typography>
                                <Typography component="p">
                                    {
                                        product.ingredients.map((ingredient, index2) => (
                                            <Chip
                                                sx={{m:0.2}}
                                                label={ingredient.ingredientName}
                                                onDelete={handleDelete}
                                            />
                                        ))
                                    }
                                </Typography>
                            </Box>

                        </Stack>
                    ))
                }
            </CardContent>
        </Card>
    );
}

export default Commande;