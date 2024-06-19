import dbConnect from "@/utils/dbConnect"

const users = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            await dbConnect()
            res.status(200).json({ success: true })
            break
    }
}

export default users