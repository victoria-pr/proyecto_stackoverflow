import mongoose from 'mongoose';
const host = 'localhost'; /*"mongo-stack"*/
const port = process.env.MONGO_PORT || 27019;
const database = process.env.MONGO_DB || 'stack';
const MONGODB_URI = `mongodb://${host}:${port}/${database}`;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log ('conexion satisfactoria a MongoDB'))
    .catch((error)=> console.error('Error al conectarse a MongoDB: ', error));

    export default mongoose;
