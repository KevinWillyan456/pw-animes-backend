import mongoose from 'mongoose'

export default class ConnectToDatabase {
    public static async connect() {
        try {
            await mongoose.connect(`${process.env.DATABASE_URL}`)
            console.log('Conectou ao Banco de Dados')
        } catch (error) {
            console.error(error)
        }
    }
}
