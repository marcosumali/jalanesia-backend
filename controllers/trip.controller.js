const Trip = require('../models/Trip')
const Supplier = require('../models/Supplier')
const Category = require('../models/Category')

module.exports = {
  findAll: (req, res) => {
    Trip.find()
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()
      .then(trips => {
        res.status(200).json({
          message: 'Trips retrieved successfully',
          trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch trips',
          err
        })
      })
  },
  findOne: (req, res) => {
    let { tripId } = req.query
    let userList = req.userList
    Trip.findById(tripId)
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()
      .then(trip => {
        res.status(200).json({
          message: 'Trip retrieved successfully',
          trip,
          userList
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to retrieve trip',
          err
        })
      })
  },
  findBySupplier: (req, res) => {
    let { name } = req.query
    Supplier.findOne({ name })
      .then(supplier => {
        Trip.find({supplierId: supplier._id})
          .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
          .populate({ path: 'locationId', select: '-_id' })
          .populate({ path: 'categoryId', select: '-_id' })
          .exec()  
          .then(tripsBySupplier => {
            res.status(200).json({
              message: 'Trips by supplier successfully retrieved',
              tripsBySupplier
            })
          })
          .catch(err2 => {
            res.status(400).json({
              message: 'ERROR: unable retrieve trip by supplier',
              err2
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find supplier',
          err
        })
      })
  },
  addTrip: (req, res) => {
    let { name } = req.query
    Supplier.findOne({ name })
      .then(supplier => {
        let { name, startDate, endDate, price, locationId, quota, difficulty, categoryId, promoteStatus, description } = req.body
        Trip.create({
          supplierId: supplier._id,
          name,
          startDate,
          endDate,
          price,
          locationId,
          quota,
          difficulty,
          categoryId,
          promoteStatus: promoteStatus || false,
          description: {
            highlight: description.highlight,
            inclusive: description.inclusive || '',
            excludes: description.excludes || '',
            itinerary: description.itinerary || '',
            notes: description.notes || '',
            terms: description.terms || ''
          },
        })
        .then(trip =>{
          res.status(200).json({
            message: 'New trip created',
            trip
          })
        })
        .catch(err => {
          res.status(400).json({
            message: 'ERROR: unable to add trip',
            err
          })
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find supplier',
          err
        })
      })
  },
  deleteTrip: (req, res) => {
    let { id } = req.query
    Trip.findByIdAndRemove(id)
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()
      .then(trip => {
        res.status(200).json({
          message: 'Trip sucessfully deleted',
          trip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete trip',
          err
        })
      })
  },
  getPromotedTrips: (req, res) => {
    Trip.find({ promoteStatus: true })
      .populate('supplierId')
      .exec()
      .then(trips => {
        res.status(200).json({
          message: 'Get promoted trip sucessful',
          promotedTrips: trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get promoted trip',
          err
        })
      })
  },
  getTripsByCategory: (req, res) => {
    let { name } = req.query
    Category.findOne({ name })
      .then(category => {
        Trip.find({ categoryId: category._id })
          .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
          .populate({ path: 'locationId', select: '-_id' })
          .populate({ path: 'categoryId', select: '-_id' })
          .exec()
          .then(trips => {
            res.status(200).json({
              message: 'Get trips by category sucessful',
              trips
            })
          })
          .catch(err => {
            res.status(400).json({
              message: 'ERROR: unable to get trips by category',
              err
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find category',
          err
        })
      })
  },
  getDivingTrips: (req, res) => {
    Trip.find({ category: 'Diving' })
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()
      .then(trips => {
        res.status(200).json({
          message: 'Get diving trip sucessful',
          trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get diving trip',
          err
        })
      })
  },
  getPartyTrips: (req, res) => {
    Trip.find({ category: 'Party' })
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()  
      .then(trips => {
        res.status(200).json({
          message: 'Get party trip sucessful',
          trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get party trip',
          err
        })
      })
  },
  getHopingTrips: (req, res) => {
    Trip.find({ category: 'Island Hoping' })
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()
      .then(trips => {
        res.status(200).json({
          message: 'Get island hoping trip sucessful',
          trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get island hoping trip',
          err
        })
      })
  },
  getFilteredTrips: (req, res) => {
    let { city, category } = req.query;
    let filters = {
      category,
      'location.city': city
    }
    Trip.find(filters)
      .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
      .populate({ path: 'locationId', select: '-_id' })
      .populate({ path: 'categoryId', select: '-_id' })
      .exec()
      .then(trips => {
        res.status(200).json({
          message: 'Get filtered trip sucessful',
          trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get filtered trip',
          err
        })
      })
  },
  promoteTrip: (req, res) => {
    let { id } = req.query
    Trip.findById(id)
      .then(trip => {
        let newPromoteStatus = ""
        if (trip.promoteStatus === false) {
          newPromoteStatus = true
        } else {
          newPromoteStatus = false
        }
        Trip.findByIdAndUpdate(id, { promoteStatus: newPromoteStatus })
          .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
          .populate({ path: 'locationId', select: '-_id' })
          .populate({ path: 'categoryId', select: '-_id' })
          .exec()  
          .then(updatedTrip => {
            res.status(200).json({
              message: 'Update promote status sucessful',
              updatedTrip
            })    
          })
          .catch(err => {
            res.status(400).json({
              message: 'ERROR: unable to update promote status for related trip',
              err
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find trip by Id',
          err
        })
      })
  },
  updateTrip: (req, res) => {
    let { name, id } = req.query
    Supplier.findOne({ name })
      .then(supplier => {
        let { name, startDate, endDate, price, locationId, quota, difficulty, categoryId, promoteStatus, description } = req.body
        Trip.findByIdAndUpdate(id ,{
          supplierId: supplier._id,
          name,
          startDate,
          endDate,
          price,
          locationId,
          quota,
          difficulty,
          categoryId,
          promoteStatus: promoteStatus || false,
          description: {
            highlight: description.highlight,
            inclusive: description.inclusive || '',
            excludes: description.excludes || '',
            itinerary: description.itinerary || '',
            notes: description.notes || '',
            terms: description.terms || ''
          },
        })
        .populate({ path: 'supplierId', select: '-_id -password -npwp -personalId' })
        .populate({ path: 'locationId', select: '-_id' })
        .populate({ path: 'categoryId', select: '-_id' })
        .exec()  
        .then(updatedTrip =>{
          res.status(200).json({
            message: 'Related trip updated',
            updatedTrip
          })
        })
        .catch(err => {
          res.status(400).json({
            message: 'ERROR: unable to update trip',
            err
          })
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update supplier',
          err
        })
      })
  }
}