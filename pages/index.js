import {
    Container,
    IconButton,
    InputBase,
    Typography,
    Paper,
    Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";
import { formatCurrency } from "@/utils/currency";
import { useState } from "react";
import { useRouter } from "next/router";

import slugify from "slugify";
import Link from "next/link";
import SearchIcon from "@material-ui/icons/Search";
import TemplateDefault from "../src/templates/Default";
import Card from "@/components/Card";
import dbConnect from "@/utils/dbConnect";
import ProductsModels from "../src/models/products"

const useStyles = makeStyles((theme) => ({
    productLink: {
        textDecoration: 'none !important'
    },
    searchBox: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        marginTop: 20,
    },
    cardGrid: {
        marginTop: 50,
    }
}))

const Home = ({ products  }) => {
    const router = useRouter()
    const [search, setSearch] = useState()
    const classes = useStyles()

    const handleSubmitSearch = () => {
        router.push({
            pathname: `/search/${search}`,
        })
    }

    return(
        <TemplateDefault>
            <Container maxWidth="md">
                <Typography component="h1" variant="h3" align="center" color="textPrimary">
                    O que deseja encontrar?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Ex.: iPhone 12 com garantia"
                        fullWidth
                    />
                    <IconButton onClick={handleSubmitSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>

            <Container maxWidth="md" className={classes.cardGrid}>
                <Typography component="h2" variant="h4" align="center" color="textPrimary">
                    Destaques
                </Typography>
                <br />
            <Grid container spacing={4}>
                {
                    products.map(product => {
                        const category = slugify(product.category).toLocaleLowerCase()
                        const title = slugify(product.title).toLocaleLowerCase()

                        return(
                            <Grid key={product._id} item xs={12} sm={6} md={4}>
                                <Link href={`/${category}/${title}/${product._id}`} passHref>
                                    <a className={classes.productLink}>
                                        <Card
                                            image={`/uploads/${product.files[0].name}`}
                                            title={product.title}
                                            subtitle={formatCurrency(product.price)}
                                        />
                                    </a>
                                </Link>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    const products = await ProductsModels.aggregate([{
        $sample: {size: 6}
    }])

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}

export default Home