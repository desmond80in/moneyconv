import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const Auth = (request) => {
    let decodeToken;
 
    try {
      decodeToken = verifyToken(request);
      if(!decodeToken){
        return { isAuth: false };
      }
    } catch (err) {
      return { isAuth: false };
    }
  
    // in case any error found
    if (!!!decodeToken) return { isAuth: false };
  
    // token decoded successfully, and extracted data
    return { isAuth: true, userId: decodeToken };
  }

const verifyToken = (request)=>{

    const header = request.headers.authorization;
    // not found
    if (!header) return null;
  
    // token
    const token = header.split(" ");
  
    // token not found
    if (!token) return null;
  
    let decodeToken;
  
    try {

      decodeToken = jwt.verify(token[1], 'secretKey');
      return decodeToken;

    } catch (err) {
      return null;
    }
}

const validateRoute = (req,res,next) =>{
    var decodeToken = verifyToken(req);
    if(!decodeToken){        
      res.sendStatus(403);
    }    
    next();
}

export {
    Auth,
    validateRoute
}