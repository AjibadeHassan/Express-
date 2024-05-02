import { mockUsers } from "./Constant.mjs";


export const resolveIndexByUserId = (req, res, next) => {
    const { params : { id } } = req;
    const parsedID = parseInt(id)
    
    if(isNaN(parsedID)) return res.sendStatus(400);

    const findUser = mockUsers.findIndex((user)=> user.id === parsedID);

    if(findUser === -1) return res.sendStatus(404);

    req.findUser = findUser;
    next()
    // next(new Error('an error occured'))

}

export const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next()
}
