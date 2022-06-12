export class AuthrizatsiaError extends Error   {
    constructor(status ,message){
        super()
        this.name = 'AuthrizatsiaError'
        this.status = status
        this.message = message
    }
}
export class InternalServerError extends Error {
    constructor(status ,message){
        super()
        this.name = 'InternalServerError'
        this.status = status
        this.message = message
    }
}
export class ValidationError extends Error     {
    constructor(status ,message){
        super()
        this.name = 'ValidationError'
        this.status = status
        this.message = message
    }
}
export class ForbiddinError extends Error      {
    constructor(status ,message){
        super()
        this.name = 'ForbiddinError'
        this.status = status
        this.message = message
    }
}