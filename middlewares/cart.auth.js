const Cart = require('../models/Cart');


module.exports = {
  getCart: (req, res, next) => {
    let { _id } = req.decoded
    Cart.find({ userId: _id })
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .exec()
      .then(cart => {
        req.cart = cart[0]
        next()
      })
      .catch(err => {
        let error = new Error('No cart with related userId found !')
        next(error)
      })

  },
  autherror: (err, req, res, next) => {
    if (err) {
      let indexEx = err.stack.indexOf('!')
      let errMessage = err.stack.slice(0,indexEx+1)
      res.status(403).json({
          message: errMessage,
          err
      })
    } else {
      next();
    }
  },
}