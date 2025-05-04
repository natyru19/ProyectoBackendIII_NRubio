export function onlyAdmin(req, res, next) {
    if(req.user.role === "admin"){
        next();
    } else {
        res.status(403).json({status: "error", message: `Acceso denegado, este sitio es solo para administradores`, data: null});
    }
}

export function onlyUser(req, res, next) {
    if(req.user.role === "user") {
        next();
    } else {
        res.status(403).json({status: "error", message: `Acceso denegado, este sitio es solo para usuarios`, data: null});
    }
}