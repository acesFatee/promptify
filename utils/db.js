import mongoose from 'mongoose'

let isConnected = false; 

export const connectToMongo = async () =>{
    mongoose.set('strictQuery', true)
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() =>{
            console.log("Connected to Mongo")
        }).catch((error) =>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}