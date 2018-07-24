const Category = require('../models/Category')

module.exports = {
  findAll: (req, res) => {
    Category.find()
      .exec()
      .then(categories => {
        res.status(200).json({
          message: 'Categories retrieved',
          categories
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch Categories',
          err
        })
      })
  },
  findOne: (req, res) => {
    let { id } = req.query
    Category.findById(id)
      .exec()
      .then(category => {
        res.status(200).json({
          message: 'Single Category by Id retrieved',
          category
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch Category by Id',
          err
        })
      })
  },
  add: (req, res) => {
    let { name } = req.body
    Category.create({
      name,
    })
      .then(category => {
        res.status(200).json({
          message: 'New Category added successfully',
          category
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to add Category',
          err
        })
      })
  },
  update: (req, res) => {
    let { name, newName } =  req.body
    Category.findOneAndUpdate({
      name
    }, {
      name: newName
    })
      .then(updatedCategory => {
        res.status(200).json({
          message: 'Related Category updated successfully',
          updatedCategory
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update Category',
          err
        })
      })

  },
  deletion: (req, res) => {
    let { name } = req.body
    Category.findOneAndRemove({ name })
      .exec()
      .then(category => {
        res.status(200).json({
          message: 'Category deleted successfully',
          category
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete Category',
          err
        })
      })
  }
}