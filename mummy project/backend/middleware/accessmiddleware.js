const accesmiddleware = (...role) => {
    return (req, res, next) => {
        if(role.includes(req.role)){
            next()
        }
        else{
            res.status(200).json({"Message":"You are not authorized to acces this page"})
        }
    }
}

module.exports = {
    accesmiddleware
}