import  Jwt  from "jsonwebtoken";

const secretKey = 'secruty'

export default {
    sign: (payload) => Jwt.sign(payload,secretKey),
    veryfy: (token) => Jwt.verify(token,secretKey)
}