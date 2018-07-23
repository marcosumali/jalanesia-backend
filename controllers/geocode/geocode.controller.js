const googleTrends = require('google-trends-api')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const Province = require('../../models/Geocode/Province')
const City = require('../../models/Geocode/City')

const key = process.env.KEY

module.exports = {
  provinceGetAll: (req, res) => {
    Province.find()
      .then(pronvices => {
        console.log('check length', pronvices.length)
        res.status(200).json({
          message: 'Get provinces successful',
          pronvices
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get  provinces',
          err
        })
      })
  },
  provinceCheckAll: async (req, res) => {
    let provinceFile = fs.readFileSync(path.join(__dirname, '/location/province.txt'), 'utf8').trim().split('\n');
    let provinceKeys = provinceFile[0].split(',')
    let provinceLists = [];

    for (let i = 1; i < provinceFile.length; i++) {
      let provinceDatas = provinceFile[i].split(',')
      let provinceObj = {}
      for (let j = 0; j < provinceDatas.length; j++) {
        for (let k = 0; k < provinceKeys.length; k++) {
          if (j == k) {
            provinceObj[provinceKeys[k]] = provinceDatas[j]
          }
        }
      }
      provinceLists.push(provinceObj)
    }
    console.log('check Province All',provinceLists.length)

    let geoRules = await Promise.all(provinceLists.map(async (province, index) => {
      let provinceName = province.Province.replace(/ /g, '%20')

      const geoData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${provinceName}&region=indonesia&key=${key}`)
      
      if (geoData.data.results[0]) {
        province['latitude'] = geoData.data.results[0].geometry.location.lat
        province['longitude'] = geoData.data.results[0].geometry.location.lng
      }

    }))
    // console.log(provinceLists)
  },
  provinceSaveAll: async (req, res) => {
    Province.remove({})
      .then(async deletedProvinces => {

        let provinceFile = fs.readFileSync(path.join(__dirname, '/location/province.txt'), 'utf8').trim().split('\n');
        let provinceKeys = provinceFile[0].split(',')
        let provinceLists = [];
    
        for (let i = 1; i < provinceFile.length; i++) {
          let provinceDatas = provinceFile[i].split(',')
          let provinceObj = {}
          for (let j = 0; j < provinceDatas.length; j++) {
            for (let k = 0; k < provinceKeys.length; k++) {
              if (j == k) {
                provinceObj[provinceKeys[k]] = provinceDatas[j]
              }
            }
          }
          provinceLists.push(provinceObj)
        }
        console.log('check Province All',provinceLists.length)
    
        let geoRules = await Promise.all(provinceLists.map(async (province, index) => {
          let provinceName = province.Province.replace(/ /g, '%20')
    
          const geoData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${provinceName}&region=indonesia&key=${key}`)
          
          if (geoData.data.results[0]) {
            province['latitude'] = geoData.data.results[0].geometry.location.lat
            province['longitude'] = geoData.data.results[0].geometry.location.lng
          }
    
        }))
        // console.log(provinceLists)
    
        let dataRules = await Promise.all(provinceLists.map(async (data, index) => {
          let addProvince = await Province.create({
            name: data.Province,
            geographicalUnit: data.GeographicalUnit,
            country: 'Indonesia',
            latitude: data.latitude,
            longitude: data.longitude,
          })
            .then(newProvince => {
              // console.log('Add new province successful', newProvince)
            })
            .catch(err => {
              res.status(400).json({
                message: 'ERROR: unable to add province',
                err
              })
            })
        }))

        await res.status(200).json({
          message: 'Add provinces successful',
        })

      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete provinces prior to add province',
          err
        })
      })
  },
  cityGetAll: (req, res) => {
    City.find()
      .then(cities => {
        console.log('check length', cities.length)
        res.status(200).json({
          message: 'Get cities successful',
          cities
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to get cities',
          err
        })
      })
  },
  cityCheckAll: async (req, res) => {
    let cityFile = fs.readFileSync(path.join(__dirname, '/location/city.txt'), 'utf8').trim().split('\n');
    let cityKeys = cityFile[0].split(',')
    let cityLists = [];

    for (let i = 1; i < cityFile.length; i++) {
      let cityDatas = cityFile[i].split(',')
      let cityObj = {}
      for (let j = 0; j < cityDatas.length; j++) {
        for (let k = 0; k < cityKeys.length; k++) {
          if (j == k) {
            cityObj[cityKeys[k]] = cityDatas[j]
          }
        }
      }
      cityLists.push(cityObj)
    }
    console.log('check city All',cityLists.length)

    let geoRules = await Promise.all(cityLists.map(async (city, index) => {
      let cityName = city.City.replace(/ /g, '%20')

      const geoData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&region=indonesia&key=${key}`)
      
      if (geoData.data.results[0]) {
        city['latitude'] = geoData.data.results[0].geometry.location.lat
        city['longitude'] = geoData.data.results[0].geometry.location.lng

        const geoDataAddresses = geoData.data.results[0].address_components
        geoDataAddresses.map((geoDataAddress, index) => {
          if (geoDataAddress.types[0] === 'administrative_area_level_1') {
            city['province'] = geoDataAddress.long_name
          }
        })
      }
    }))
    // console.log(cityLists)
  },
  citySaveAll: async (req, res) => {
    City.remove({})
      .then(async deletedCities => {
          let cityFile = fs.readFileSync(path.join(__dirname, '/location/city.txt'), 'utf8').trim().split('\n');
          let cityKeys = cityFile[0].split(',')
          let cityLists = [];
      
          for (let i = 1; i < cityFile.length; i++) {
            let cityDatas = cityFile[i].split(',')
            let cityObj = {}
            for (let j = 0; j < cityDatas.length; j++) {
              for (let k = 0; k < cityKeys.length; k++) {
                if (j == k) {
                  cityObj[cityKeys[k]] = cityDatas[j]
                }
              }
            }
            cityLists.push(cityObj)
          }
          console.log('check city All',cityLists.length)
      
          let geoRules = await Promise.all(cityLists.map(async (city, index) => {
            let cityName = city.City.replace(/ /g, '%20')
      
            const geoData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&region=indonesia&key=${key}`)
            
            if (geoData.data.results[0]) {
              city['latitude'] = geoData.data.results[0].geometry.location.lat
              city['longitude'] = geoData.data.results[0].geometry.location.lng
      
              const geoDataAddresses = geoData.data.results[0].address_components
              geoDataAddresses.map((geoDataAddress, index) => {
                if (geoDataAddress.types[0] === 'administrative_area_level_1') {
                  city['province'] = geoDataAddress.long_name
                }
              })
            }
          }))
          // console.log(cityLists)
      
          let dataRules = await Promise.all(cityLists.map(async (data, index) => {
            let addCity = await City.create({
              name: data.City,
              island: data.Island,
              province: data.province,
              country: 'Indonesia',
              latitude: data.latitude,
              longitude: data.longitude,
            })
              .then(newCity => {
                // console.log('Add new city successful', newCity)
              })
              .catch(err => {
                res.status(400).json({
                  message: 'ERROR: unable to add cities',
                  err
                })
              })
          }))

          await res.status(200).json({
            message: 'Add cities successful'
          })

      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete cities prior to add city',
          err
        })
      })
  }


}