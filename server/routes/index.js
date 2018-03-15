var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;





// routes to fetch the table -> break out ummcounts, likecounts, length, etc.

// router.get('/:id', report, (req, res, next) => {
//   Reports.findById(req.params.id)
//     .then(result => res.json(result))
// })

// router.get('/report/:detail, (req, res, next) => {
//   Reports.findById(req.params.id, {
//     where:
//   })
//     .then(result => res.json(result))
// })

/*

router.get('/report/:detail, (req, res, next) => {
  Speeches.findById(req.params.id)
    .then(result => res.json(result))
})

router.get('/report/:detail, (req, res, next) => {
  Reports.findById(req.params.id, {
    where:
  })
    .then(result => res.json(result))
})
