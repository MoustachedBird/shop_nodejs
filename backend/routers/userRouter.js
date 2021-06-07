import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

/*la funcion debe ser async para coincidir con el funcionamiento de mongoose que es asincrono
crea los usuarios por defecto
*/
userRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
        //await User.remove({}); //elimina todos los usuarios
        
        /*Crea los usuarios a través de un archivo*/
        const createdUser = await User.insertMany(data.users);
        res.send({createdUser});
    }
));

export default userRouter;