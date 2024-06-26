import { Avatar, Box, Card, CardHeader, CardMedia, Chip, Container, Grid, Typography } from "@material-ui/core";
import { formatCurrency } from "@/utils/currency";
import { makeStyles } from "@material-ui/core/styles";

import TemplateDefault from "../../../src/templates/Default";
import ProductsModel from "../../../src/models/products"

import Carousel from "react-material-ui-carousel";
import dbConnect from "@/utils/dbConnect";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    productName: {
        margin: '15px 0',
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card: {
        height: '100%',
    },
    cardMedia: {
        paddingTop: '56%',
    }
}))

const Product = ({ product }) => {
    const classes = useStyles()

    return(
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.box}>
                            <Carousel
                                autoPlay={false}
                                animation="slide"
                                navButtonsAlwaysVisible
                                navButtonsProps={{
                                    style: {
                                        color: 'white',
                                    }
                                }}
                            >
                                {
                                    product.files.map(file => (
                                        <Card key={file.name} className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia} 
                                                image={`/uploads/${file.name}`}
                                                title={product.title}
                                            />
                                        </Card>
                                    ))
                                }
                            </Carousel>
                        </Box>

                        <Box className={classes.box} textAlign="left">
                            <Typography component="span" variant="caption" className={classes.titles}>Publicado 16 junho de 2024</Typography>
                            <Typography component="h4" variant="h4" className={classes.productName}>{product.title}</Typography>
                            <Typography component="h4" variant="h4" className={classes.price}>{formatCurrency(product.price)}</Typography>
                            <Chip label={product.category} />
                        </Box>

                        <Box className={classes.box} textAlign="left">
                            <Typography component="h6" variant="h6">Descrição</Typography>
                            <Typography component="p" variant="body2">
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Card elevation={0} className={classes.box}>
                            <CardHeader 
                                avatar={
                                    <Avatar src={product.user.image}>
                                        { product.user.image || product.user.name[0 ]}
                                    </Avatar>
                                }
                                title={product.user.name}
                                subheader={product.user.email}
                            />
                            <CardMedia 
                                image={product.user.image}
                                title={product.user.name}
                            />
                        </Card>

                        <Box className={classes.box}>
                            <Typography component="h6" variant="h6">
                                Localização
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    const { id } = query

    await dbConnect()

    const products = await ProductsModel.findOne({ _id: id })

    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}

export default Product