import mongoose from "mongoose";
//L7SFWH6o1aY58V3S
//mongodb+srv://Subhamay:<password>@cluster0.izzj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
function initDB(){
    if(mongoose.connections[0].readyState){
        return;
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.on('connected',()=>{
        console.log('Mongoose is connected')
    });
    mongoose.connection.on('error',(err)=>{
        console.log('Mongoose connection error: '+err)
    });
}
export default initDB;