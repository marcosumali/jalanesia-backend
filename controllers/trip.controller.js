const Trip = require('../models/Trip')
const Supplier = require('../models/Supplier')

module.exports = {
  findAll: (req, res) => {
    Trip.find()
      .populate('supplierId')
      .exec()
      .then(trips => {
        res.status(200).json({
          message: 'all trips retrieved successfully',
          trips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to fetch trips',
          err
        })
      })
  },
  findOne: (req, res) => {
    // console.log('ini find one')
    Trip.findById(req.params.id)
      .then(trip => {
        res.status(200).json({
          message: 'trip retrieved',
          trip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to retrieve trip',
          err
        })
      })
  },
  findBySupplier: (req, res) => {
    // console.log('---------------')
    Supplier.find({username: req.params.supplierName})
      .then(supplier => {
        console.log(supplier)
        Trip.find({supplierId: supplier._id})
          .then(tripsBySupplier => {
            res.status(200).json({
              message: 'trips by supplier successfully retrieved',
              tripsBySupplier
            })
          })
          .catch(err2 => {
            res.status(400).json({
              message: 'unable retrieve trip by supplier',
              err2
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to find supplier',
          err
        })
      })
  },
  addTrip: (req, res) => {
    // console.log('===>', req.params)
    Supplier.find({username: req.params.supplierName})
      .then(supplier => {
        // console.log(supplier)
        Trip.create({
          supplierId: supplier[0]._id,
          name: req.body.name,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          price: req.body.price,
          location: {
            city: req.body.location.city,
            country: req.body.location.country,
            latitude: req.body.location.latitude || '',
            longitude: req.body.location.longitude || ''
          },
          quota: req.body.quota,
          difficulty: req.body.difficulty || "",
          description: {
            highlight: req.body.description.highlight,
            inclusive: req.body.description.inclusive || '',
            excludes: req.body.description.excludes || '',
            itinerary: req.body.description.itinerary || '',
            notes: req.body.description.notes || '',
            terms: req.body.description.terms || ''
          },
          category: req.body.category,
          promoteStatus: req.body.promoteStatus || false,
        })
        .then(trip =>{
          res.status(200).json({
            message: 'New trip created',
            trip
          })
        })
        .catch(err2 => {
          res.status(400).json({
            message: 'ERROR: unable to add trip',
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
  deleteTrip: (req, res) => {
    Trip.findByIdAndRemove(req.params.id)
      .then(trip => {
        res.status(200).json({
          message: 'trip sucessfully deleted',
          trip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to delete trip',
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
  getDivingTrips: (req, res) => {
    Trip.find({ category: 'diving' })
      .populate('supplierId')
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
    Trip.find({ category: 'party' })
      .populate('supplierId')
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
    Trip.find({ category: 'island hoping' })
      .populate('supplierId')
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
    .populate('supplierId')
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
  }
}