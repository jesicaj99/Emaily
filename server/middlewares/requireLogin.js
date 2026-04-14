// lower case r in files are exports
// uppercase R in files are classes

// implemented in routes files
module.exports = (req, res, next) => { // next is called when middleware is complete
    if (!req.user){ // not logged in 
        return res.status(401).send({ error: 'You must log in' })
    }

    next();
};