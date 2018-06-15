module.exports = (req, res, next) => {
    //just want to check if user signed in
    if (!req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits' });
    }
    //otherwise let user continue on to next handler
    next();
}