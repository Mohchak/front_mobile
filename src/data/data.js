export const Data = [
    {
        id: 1,
        productCategoryName: 'Burgers',
        image: "https://asian-recipe.com/wp-content/uploads/2021/10/5ad624bb-b1a6-4c25-a616-4caeea05bf2c.png",
        panel: 'panel1',
        index: '1',
        products: [
            {
                id: 1,
                productName: 'Beef Burgers',
                price: 60.00,
                image: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/520765216/classic-beef-burger.jpg?resize=640,468&quality=82&strip=all",
                description: "Short Description ....",
                choice: true,
                ingredients: [
                    {
                        status : true,
                        type: 'none',
                        ingredientName: 'Beef',
                        price: 0.00,
                        validate: false,
                    },
                    {
                        status : false,
                        type: 'none',
                        ingredientName: 'Tomato',
                        price: 0.00,
                        validate: true,
                    },
                    {
                        status : true,
                        type: 'choice',
                        ingredientName: 'Sauce',
                        choiceName: '',
                        choiceNbr : 2,
                        validate: false,
                        choice : [
                            {
                                choiceName: 'Algerian',
                                status: false,
                                price: 3.50,
                            },
                            {
                                choiceName: 'Biggy',
                                status: false,
                                price: 0.00,
                            },
                            {
                                choiceName: 'Blanche',
                                status: false,
                                price: 2.00,
                            }
                        ]
                    },
                    {
                        status : false,
                        type: 'none',
                        ingredientName: 'Onion',
                        price: 0.00,
                        validate: true,
                    }
                ],
                accompaniement:[{

                }],
                extras:[{

                }],
                cpt:0,
            },
            {
                id: 2,
                productName: 'Elk Burgers',
                price: 45.00,
                image: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/316673155/elk-burger.jpg?resize=640,468&quality=82&strip=all",
                description: "An elk burger not only has more protein than traditional ground beef, but it's also significantly lower in fat.",
                choice: false,
                ingredients: [
                    {
                        status : true,
                        ingredientName: 'Elk',
                    },
                    {
                        status : true,
                        ingredientName: 'Tomato',
                    },
                    {
                        status : true,
                        ingredientName: 'Ketchup',
                    },
                    {
                        status : true,
                        ingredientName: 'Onion',
                    }
                ],
                cpt:0,
            },
            {
                id: 3,
                productName: 'Portabello Mushroom Burgers',
                price: 99.00,
                image: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/254552601/raw-portobello-burger.jpg?resize=640,468&quality=82&strip=all",
                description: "A traditional ground beef burger can be a good, high-protein meal—especially if it's grass-finished beef, which we'll tell you more about in a second.",
                choice: false,
                ingredients: [
                    {
                        status : true,
                        ingredientName: 'Beef',
                    },
                    {
                        status : true,
                        ingredientName: 'Tomato',
                    },
                    {
                        status : true,
                        ingredientName: 'Ketchup',
                    },
                    {
                        status : true,
                        ingredientName: 'Onion',
                    },
                    {
                        status : true,
                        ingredientName: 'Beef',
                    },
                    {
                        status : true,
                        ingredientName: 'Tomato',
                    },
                    {
                        status : true,
                        ingredientName: 'Ketchup',
                    },
                    {
                        status : true,
                        ingredientName: 'Onion',
                    }
                ],
                cpt:0,
            },
            {
                id: 4,
                productName: 'Turkey Burgers',
                price: 20.00,
                image: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/184168996/turkey-burger.jpg?resize=640,468&quality=82&strip=all",
                description: "A traditional ground beef burger can be a good, high-protein meal—especially if it's grass-finished beef, which we'll tell you more about in a second.",
                choice: false,
                ingredients: [
                    {
                        status : true,
                        ingredientName: 'Beef',
                    },
                    {
                        status : true,
                        ingredientName: 'Tomato',
                    },
                    {
                        status : true,
                        ingredientName: 'Ketchup',
                    },
                    {
                        status : true,
                        ingredientName: 'Onion',
                    }
                ],
                cpt:0,
            },
            {
                id: 5,
                productName: 'Veggie Burgers',
                price: 110.00,
                image: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/351400125/pumpkin-veggie-burger.jpg?resize=640,468&quality=82&strip=all",
                description: "A traditional ground beef burger can be a good, high-protein meal—especially if it's grass-finished beef, which we'll tell you more about in a second.",
                choice: false,
                ingredients: [
                    {
                        status : true,
                        ingredientName: 'Beef',
                    },
                    {
                        status : true,
                        ingredientName: 'Tomato',
                    },
                    {
                        status : true,
                        ingredientName: 'Ketchup',
                    },
                    {
                        status : true,
                        ingredientName: 'Onion',
                    }
                ],
                cpt:0,
            },
        ]
    },
]