module.exports = {
  authUserCartTrip: (req, res, next) => {
    let { userId } = req.cart
    let { _id } = req.decoded
    if (userId === _id) {
      next()
    } else {
      let error = new Error('You are not authorised !')
      next(error)
    }
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
  } 

}