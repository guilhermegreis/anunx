import { useState } from "react"
import { Formik } from "formik"
import * as yup from "yup"

import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    Select,
    Typography, 
    MenuItem,
    FormHelperText,
    Input
} from "@material-ui/core"
    
import { makeStyles } from "@material-ui/core/styles"
import { useDropzone } from "react-dropzone"

import TemplateDefault from "../../src/templates/Default"
import { DeleteForever, ErrorSharp } from "@material-ui/icons"

const useStyles = makeStyles((theme) =>( {
    mask: {},
    mainImage: {},
    boxContainer: {
        paddingBottom: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        // boxShadow: '0px 4px 8px rgba(0, 0, 0, 10)',
    },
    buttonEnv: {
        backgroundColor: theme.palette.background.black,
        padding: theme.spacing(0),
    },
    thumbsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    InputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
    },
    dropzone: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px',
        width: 200,
        height: 150,
        margin: '0 15px 15px 0',
        backgroundColor: theme.palette.background.default,
        border: '2px dashed black'
    },
    thumb: {
        position: 'relative',
        width: 200,
        height: 150,
        backgroundSize: 'cover',
        margin: '0 15px 15px 0',
        backgroundPosition: 'center center',

        '& $mainImage': {
            backgroundColor: 'blue',
            padding: '6px 10px',
            position: 'absolute',
            bottom: 0,
            left: 0,
        },

        '&:hover $mask': {
            display: 'flex',
        },

        '& $mask': {
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            height: '100%',
        }
    }
}))

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Escreva um título maior')
        .max(100, 'Título muito grande')
        .required('Campo obrigatório'),

    category: yup.string().required('Campo obrigatório'),
    description: yup.string()
        .min(50, 'Escreva uma descrição com pelo menos 50 caracteres')
        .required('Campo obrigatório'),
    price: yup.number().required('Campo obrigatório'),
    email: yup.string().email('Digite um e-mail valido').required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    phone: yup.number().required('Campo obrigatório'),
    files: yup.array().min(1, 'Envie pelo menos uma foto').required('Campo obrigatório')
})

const Publish = () => {
    const classes = useStyles()

    return (
        <TemplateDefault>
            <Formik
                initialValues={{
                    title: '',
                    category: '',
                    description: '',
                    price: '',
                    email: '',
                    name: '',
                    phone: '',
                    files: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('ok enviou o form', values)
                }}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => {
                        const { getRootProps, getInputProps } = useDropzone({
                            accept: 'image/*',
                            onDrop: (acceptedFile) => {
                                const newFiles = acceptedFile.map(file => {
                                    return {
                                        ...file,
                                        preview: URL.createObjectURL(file)
                                    }
                                })
                    
                                setFieldValue([
                                    ...values.files,
                                    ...newFiles,
                                ])
                            }
                        })
                    
                        const handleRemoveFile = fileName => {
                            const newFileState = values.files.filter(file => file.name !== fileName)
                            setFieldValue(newFileState)
                        }

                        return (
                            <form onSubmit={handleSubmit}>
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
                                        <Typography component="h6" variant="h6" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                            Imagens
                                        </Typography>
                                        <Typography component="div" variant="body2" color={errors.files && touched.files? 'error' : 'textPrimary'}>
                                            A primeira imagem é a foto principal do seu anúncio.
                                        </Typography>
                                        {
                                            errors.files && touched.files
                                                ? <Typography variant="body2" color="error" gutterBottom>{erros.files}</Typography>
                                                : null
                                        }
                                        <Box className={classes.thumbsContainer}>
                                            <Box className={classes.dropzone} {...getRootProps()}>
                                                <input name="files" {...getInputProps()} />
                                                <Typography variant="body2" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                    Clique para adicionar ou arraste a imagem para aqui.
                                                </Typography>
                                            </Box>
                    
                                            {
                                                values.files.map((file, index) => (
                                                    <Box
                                                    key={file.name}
                                                    className={classes.thumb}
                                                    style={{backgroundImage: `url(${file.preview})`}}
                                                    >
                                                        {
                                                            index === 0 ? 
                                                            <Box className={classes.mainImage}>
                                                                <Typography variant="body" color="secondary">
                                                                    Principal
                                                                </Typography>
                                                            </Box>
                                                            : null
                                                        }
                                                        <Box className={classes.mask}>
                                                            <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                                                                <DeleteForever fontSize="large"/>
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
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
                                        <Button type="submit" variant="contained" color="primary">
                                            Publicar Anúncio
                                        </Button>
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

export default Publish