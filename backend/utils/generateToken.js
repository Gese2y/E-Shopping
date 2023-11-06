import jwt from 'jsonwebtoken';

const generaToken = (res, userId) =>{
    const token = jwt.sign({ userId},process.env.JWT_SECRET,
        {
            expiresIn:'30d'
    })
// Set JWT as HTTP-only cookie
res.cookie('jwt',token,{
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    maxAge: 30 * 60 * 60 * 1000, // 30 days
});
}

export default generaToken;