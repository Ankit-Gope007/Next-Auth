import mongoose from "mongoose"

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("Mongodb Connected Succesfully")
        })

        connection.on("errors",(err) => {
            console.log("Error occured while connecting to the mongodb",err)
            process.exit()
         })
        
    } catch (error) {
        console.log("Something is not right",error)
    }
}

