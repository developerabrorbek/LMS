import jwt from "jsonwebtoken"
import { BadRequestException } from "../exceptions/bad-request.exception.js"
import jwtConfig from "../config/jwt.config.js"

export const VerifyJwtTokenMiddleware = (req,res,next) => {

    const token = req.headers['token'];

    if(!token) throw new BadRequestException('you havent access for this operation')

    jwt.verify(token , jwtConfig.secretKey ,(err)=>{

        if(err) throw new BadRequestException('Token expired')
        
        next()
    })
}