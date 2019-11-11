const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');

const getQuery = (apiquery, locationsRoute) => {
  // apiquery is an request object
  // locationsRoute is a boolean

  let orderNameInt;
  let orderSmileyInt;

  let name = apiquery.name;
  let orderby = apiquery.orderby;
  let cities = apiquery.cities;
  let smileys = apiquery.smileys;

  let page = apiquery.page;

  // 1 = ASC, -1 = DESC
  switch (orderby) {
    case 'NAME_AZ':
      orderNameInt = 1;
      break;
    case 'NAME_ZA':
      orderNameInt = -1;
      break;
    case 'SMILEY_ASC':
      // [3, 2, 1, 0] = "Sur, nøytral, smil, smil"
      // Because of how mongoDb works, we must provide with -1
      orderSmileyInt = -1;
      break;
    case 'SMILEY_DESC':
      // [0, 1, 2, 3] = "Smil, smil, nøytral, Sur"
      // Because of how mongoDb works, we must provide with 1
      orderSmileyInt = 1;
      break;
    default:
      // Default case is NAME_AZ
      orderNameInt = 1;
  }

  let mongoQuery;
  if (!cities && !smileys) {
    mongoQuery = {
      // Finds even if name is blank
      $match: { name: new RegExp(name, 'i') }
    };
  } else if (!cities) {
    mongoQuery = {
      $match: {
        name: new RegExp(name, 'i'),
        'smileys.0.grade': { $in: smileys.split('-').map(Number) }
      }
    };
  } else if (!smileys) {
    mongoQuery = {
      $match: { name: new RegExp(name, 'i'), city: { $in: cities.split('-') } }
    };
  } else {
    //(name || (cities && smileys))
    mongoQuery = {
      $match: {
        name: new RegExp(name, 'i'),
        city: { $in: cities.split('-') },
        'smileys.0.grade': { $in: smileys.split('-').map(Number) }
      }
    };
  }

  let mongoSearchSortQuery = {};
  let mongoPaginationQuery = {};
  // Default, skips nothing
  let mongoSkipInt = 0;

  if (orderSmileyInt) {
    // 1 = ASC, -1 = DESC
    mongoSearchSortQuery = { 'smileys.0.grade': orderSmileyInt };
  } else {
    // 1 = ASC, -1 = DESC
    mongoSearchSortQuery = { name: orderNameInt };
  }

  if (page) {
    mongoSkipInt = parseInt(page * 20);
  }

  if (locationsRoute) {
    let projectQuery = {
      $project: {
        _id: 1,
        name: 1,
        coordinates: 1
      }
    };

    let searchQuery = {
      $sort: mongoSearchSortQuery
    };

    return [mongoQuery, searchQuery, projectQuery];
  }

  return [mongoQuery, mongoSearchSortQuery, mongoSkipInt];
};

// @route     GET companies
// @desc      Get all companies with possible sorts and filters on zipcode and city
// @access    Public
router.route('/').get((req, res) => {
  // queries = [mongoQuery, mongoSearchSortQuery, mongoSkipInt]
  let queries = getQuery(req.query, false);

  Company.aggregate([queries[0], { $sort: queries[1] }, { $skip: queries[2] }])
    .limit(20)
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET single company
// @desc      Get all details about a single company
// @access    Public
router.route('/:id').get((req, res) => {
  // queries = [mongoQuery, projectQuery]
  let _id = req.params.id;

  Company.find({ _id })
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET mapData
// @desc      Get all mapData: names and coordinates
// @access    Public
router.route('/locations').get((req, res) => {
  // queries = [mongoQuery, projectQuery]
  let queries = getQuery(req.query, true);

  Company.aggregate(queries)
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     PUT companies/giverating
// @desc      Give rating and increment numberOfRatings automatically for a specific company object
// @access    Public
router.route('/giverating').put((req, res) => {
  let id = req.body.id;
  let stars = parseInt(req.body.stars);

  Company.findByIdAndUpdate(id, {
    $inc: { numberOfRatings: 1, sumStars: stars }
  })
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/cities
// @desc      Get all cities
// @access    Public
router.route('/cities').get((req, res) => {
  Company.aggregate([{ $group: { _id: null, cities: { $addToSet: '$city' } } }])
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
