import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        console.log('Database connected')
    } catch (error) {
        console.log('DB Connection error', error)
        throw new Error(error)
    }
}

export default dbConnection