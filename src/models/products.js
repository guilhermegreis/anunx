import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
})

const schema = new mongoose.Schema({
   title: {
    type: String,
    required: [true, 'O campo "titulo do anuncio" é obrigatório.'],
   },
   category: {
    type: String,
    required: [true, 'O campo "categoria" é obrigatório.'],
   },
   description: {
    type: String,
    required: [true, 'O campo "descrição" é obrigatório'],
   },
   price: {
    type: Number,
    required: ['O campo "preço" é obrigatório'],
   },
   user:{
    id: String,
    name: String,
    email: String,
    phone: String,
    image: String,
   },
   files: {
    type: [fileSchema],
    default: undefined,
   }
})

export default mongoose.models.products || mongoose.model('products', schema) 