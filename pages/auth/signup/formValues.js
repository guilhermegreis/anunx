import * as yup from 'yup'

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
}

const validationSchema = yup.object().shape({
    name: yup.string()
    .required('Campo obrigatório'),
    email: yup.string()
    .email('Digite um email valido')
    .required('Campo obrigatório'),
    password: yup.string()
    .min(8, 'Minimo de 8 caracteres')
    .required('Campo obrigatório'),
    passwordConf: yup.string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais')
})

export {
    initialValues,
    validationSchema,
}