// implemented in routes files
module.exports = (req, res, next) => { // next is called when middleware is complete
    if (req.user.credits < 1 ){ // checks for credits
        return res.status(403).send({ error: 'Not enough credits!' })
    }

    next();
};