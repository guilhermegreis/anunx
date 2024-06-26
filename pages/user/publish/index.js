import { Formik } from "formik"

import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    InputAdornment,
    Select,
    Typography, 
    MenuItem,
    FormHelperText,
    Input,
    CircularProgress
} from "@material-ui/core"
    
import TemplateDefault from "../../../src/templates/Default"
import { initialValues, validationSchema } from "./formValues"
import FileUpload from "@/components/FileUpload"

import useStyles from "./styles"
import { useToasty } from "@/contexts/Toasty"
import { useRouter } from "next/router"

const Publish = ({ userId, image }) => {
    const classes = useStyles()
    const { setToasty } = useToasty()
    const router = useRouter()

    const formValues = {
        ...initialValues,
    }

    formValues.userId = userId
    formValues.image = image

    const handleSuccess = () => {
        setToasty({
            open: true,
            text: 'Anuncio cadastrado com sucesso',
            severity: 'success',
        })

        router.push('/user/dashboard')
    }

    const handleError = () => {
        setToasty({
            open: true,
            text: 'Ops, ocorreu um erro, tente novamente',
            severity: 'error',
        })
    }

    const handleFormSubmit = (values) => {
        const formData = new FormData()

        for(let field in values) {
            if(field === 'files'){
                values.files.forEach(file => {
                    formData.append('files', file)
                })
            } else {
                formData.append(field, values[field])
            }
        }

        axios.post('/api/products/add', formData)
            .then(handleSuccess)
            .catch(handleError)
    }

    return (
        <TemplateDefault>
            <Formik
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    }) => {
                        

                        return (
                            <form onSubmit={handleSubmit}>
                                <Input type="hidden" name="userId" value={values.userId}/>
                                <Input type="hidden" name="image" value={values.image} />

                                <Container maxWidth="sm">
                                    <Typography component="h1" variant="h2" align="center" color="textPrimary">
                                        Publicar Anúncio
                                    </Typography>
                                    <Typography component="h5" variant="h5" align="center" color="textPrimary">
                                        Quanto mais detalhado, melhor!
                                    </Typography>
                                </Container>

                                <br/><br/>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.title && touched.title} fullWidth >
                                            <InputLabel className={classes.InputLabel}>Título do Anúncio</InputLabel>
                                            <Input
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                label="ex.: Bicicleta Aro 18 com garantia" 
                                                />
                                                <FormHelperText>
                                                    { errors.title && touched.title  ? error.title : null}
                                                </FormHelperText>
                                        </FormControl>
                                        <br/><br/>

                                        <FormControl error={errors.category && touched.category} fullWidth>
                                            <InputLabel className={classes.InputLabel}>Categoria</InputLabel>
                                            <Select
                                                name="category"
                                                value={values.category}
                                                fullWidth
                                                onChange={handleChange}
                                                >
                                                <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                                                <MenuItem value="Agricultura">Agricultura</MenuItem>
                                                <MenuItem value="Moda">Moda</MenuItem>
                                                <MenuItem value="Carros, Motos e Barcos">Carros, Motos e Barcos</MenuItem>
                                                <MenuItem value="Serviços">Serviços</MenuItem>
                                                <MenuItem value="Lazer">Lazer</MenuItem>
                                                <MenuItem value="Animais">Animais</MenuItem> 
                                                <MenuItem value="Moveis, Casa e Jardim">Moveis, Casa e Jardim</MenuItem>
                                                <MenuItem value="Imóveis">Imóveis</MenuItem>
                                                <MenuItem value="Equipamentos e Ferramentas">Equipamentos e Ferramentas</MenuItem>
                                                <MenuItem value="Celulares e Tablets">Celulares e Tablets</MenuItem>
                                                <MenuItem value="Esporte">Esporte</MenuItem>
                                                <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                                                <MenuItem value="Emprego">Emprego</MenuItem>
                                                <MenuItem value="Outros">Outros</MenuItem>    
                                            </Select>
                                            <FormHelperText>
                                            { errors.category && touched.category ? error.category : null}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FileUpload 
                                            files={values.files}
                                            erros={errors.files}
                                            touched={touched.files}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Box>
                                </Container>
                    
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.description && touched.description} fullWidth>
                                            <InputLabel className={classes.InputLabel}>Escreva os detalhes do que está vendendo</InputLabel>
                                            <Input
                                                name="description"
                                                multiline
                                                minRows={6}
                                                variant="outlined"
                                                onChange={handleChange}
                                                />
                                            <FormHelperText>
                                                { errors.description && touched.description  ? error.description : null}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                    
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.price && touched.price} fullWidth>
                                            <InputLabel className={classes.InputLabel}>Preço de venda</InputLabel>
                                            <Input
                                                name="price"
                                                variant="outlined"
                                                onChange={handleChange}
                                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                                />
                                            <FormHelperText>
                                                { errors.price && touched.price  ? error.price : null}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                    
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                                            Dados de Contato
                                        </Typography>
                                        <FormControl error={errors.name && touched.name} fullWidth >
                                            <InputLabel className={classes.InputLabel}>Nome</InputLabel>
                                            <Input
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    { errors.name && touched.name  ? error.name : null}
                                                </FormHelperText>
                                        </FormControl>

                                        <br/><br/>

                                        <FormControl error={errors.email && touched.email} fullWidth >
                                            <InputLabel className={classes.InputLabel}>Email</InputLabel>
                                            <Input
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    { errors.email && touched.email  ? error.email : null}
                                                </FormHelperText>
                                        </FormControl>

                                        <br/><br/>

                                        <FormControl error={errors.phone && touched.phone} fullWidth >
                                            <InputLabel className={classes.InputLabel}>Telefone</InputLabel>
                                            <Input
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    { errors.phone && touched.phone  ? error.phone : null}
                                                </FormHelperText>
                                        </FormControl>

                                        <br/><br/>

                                    </Box>
                                </Container>
                    
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box textAlign="right">
                                        {
                                            isSubmitting
                                                ? <CircularProgress className={classes.loading} />
                                                : <Button type="submit" variant="contained" color="primary">Publicar anúncio</Button>
                                        }
                                    </Box>
                                </Container>
                            </form>
                        )
                    }
                }
            </Formik>
        </TemplateDefault>
    )
}

Publish.requireAuth = true

export async function getServerSideProps({ req }){
    const { userId, user } = await getSession({ req })

    return {
        props: {
            userId,
            image: user.image,
        }
    }
}

export default Publish