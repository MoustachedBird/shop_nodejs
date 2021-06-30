import jwt from 'jsonwebtoken';

export const generateToken = (user) => { 
    /**/
    return jwt.sign(
        {
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET || '4aq@3@|a?¡A*hhJSHFal*&d##saJ',
        {
            expiresIn: '30d', 
        }
    );
};

export const isAuth = (req, res, next) =>{
    const authorization = req.headers.authorization;
    if (authorization){
        //Bearer XXXXXX, con esto eliminamos los 7 caracteres (la palabra barier y el espacio) y solo nos quedamos con el token
        const token = authorization.slice(7,authorization.length)
        // eslint-disable-next-line no-undef
        jwt.verify(token,process.env.JWT_SECRET || '4aq@3@|a?¡A*hhJSHFal*&d##saJ', (err, decode)=>{
            if(err){
                res.status(401).send({message:"Token inválido"});
            }else{
                req.user = decode;
                next();
            }
        });
    }else{
        
        res.status(401).send({message:"Token no enviado"});
    }
};