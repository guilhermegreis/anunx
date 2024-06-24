import dbConnect from "@/utils/dbConnect"
import UsersModel from "@/models/users"
import { crypto } from "@/utils/password"

const users = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            await dbConnect()
            res.status(200).json({ success: true })
            break
        
        case 'POST':
            //pegar os dados que vem no req
            //conectar no banco
            //criptografar a senha
            //salvar os dados
            //responder sucesso
            const {
                name,
                email,
                password,
            } = req.body

            await dbConnect()

            const passwordCrypto = await crypto(password)

            const user = new UsersModel({
                name,
                email,
                password: passwordCrypto,
            })

            user.save()

            res.status(201).json({ success: true})
    }
}

export default users