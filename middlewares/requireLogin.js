//next called when middleware complete, pass to next middleware in the chain

module.exports = (req, res, next) => {
    //just want to check if user signed in
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    //otherwise let user continue on to next handler
    next();
}