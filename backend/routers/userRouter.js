import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';

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

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),

        });
        const createdUser = await user.save();
        res.send({ id: user.id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        })

    }
));

userRouter.get('/:id', isAuth,expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if (user){
        res.send(user);
    }else{
        res.status(404).send({message:'User Not Found'});
    }
}));

userRouter.put('/profile',isAuth,expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password){
            user.password = bcrypt.hashSync(req.body.password,8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        })
    }

}));

export default userRouter;