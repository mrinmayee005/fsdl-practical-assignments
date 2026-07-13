import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // 1. Get the token from the request headers
    const { token } = req.headers;

    // 2. If no token is found, return an error
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please Login Again.' });
    }

    try {
        // 3. Decode and verify the token using your secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach the user ID to the request body so the controller knows WHO is asking
        req.body.userId = token_decode.id;
        
        // 5. Move to the next function (the actual logic)
        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;