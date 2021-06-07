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