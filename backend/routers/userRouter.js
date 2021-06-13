import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

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

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
        const user = await User.findOne({email: req.body.email});
        if (user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });    
                return;
            }
        }
        res.status(401).send({message: 'Usuario o contraseña incorrectos'});
    }
));

export default userRouter;