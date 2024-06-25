import React from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { 
    Box,
    Typography, 
    Container,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import TemplateDefault from "@/templates/Default";
import useStyles from "./styles";
import { initialValues, validationSchema } from "../../user/publish/formValues";
import { useToasty } from "../../../src/contexts/Toasty";

const Signin = ({ APP_URL }) => {
    const classes = useStyles();
    const router = useRouter();
    const { setToasty } = useToasty();
    const { data: session } = useSession();

    console.log(session);

    const handleGoogleLogin = () => {
        signIn('google', {
            callbackUrl: `${APP_URL}/user/dashboard`
        })
    }

    const handleFormSubmit = async values => {
        signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: 'http://localhost:3000/user/dashboard'
        });
    };

    return (
        <TemplateDefault>
            <Container maxWidth="sm" component="main" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Entre na sua conta
                </Typography>
            </Container>

            <Container maxWidth="md">
                <Box className={classes.box}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={
                                <Image 
                                    src="/images/logo_google.svg" width={20} height={20} alt="Login com Google"
                                />
                            }
                            onClick={handleGoogleLogin}
                        >
                            Entrar com Google
                        </Button>
                    </Box>

                    <Box className={classes.orSeparator}>
                        <span>ou</span>
                    </Box>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({
                            touched,
                            values,
                            errors,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {router.query.i === '1' && (
                                    <Alert severity="error" className={classes.errorMessage}>
                                        Usuário ou senha inválidos
                                    </Alert>
                                )}
                                <FormControl fullWidth error={errors.email && touched.email} className={classes.formControl}>
                                    <InputLabel>Email</InputLabel>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <FormHelperText>
                                        {errors.email && touched.email ? errors.email : null}
                                    </FormHelperText>
                                </FormControl>

                                <FormControl fullWidth error={errors.password && touched.password} className={classes.formControl}>
                                    <InputLabel>Senha</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    <FormHelperText>
                                        {errors.password && touched.password ? errors.password : null}
                                    </FormHelperText>
                                </FormControl>

                                {isSubmitting ? (
                                    <CircularProgress className={classes.loading} />
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Entrar
                                    </Button>
                                )}
                            </form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </TemplateDefault>
    );
};

Signin.getServerSideProps = async function() {
    return{
        APP_URL: process.env.APP_URL
    }
}

export default Signin;
