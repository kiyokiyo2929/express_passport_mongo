const express = require('express');
const router = express.Router();

const Work = require('../models/work');

/* GET users listing. */

router.get('/:id', (req, res, next)=>{
    Work.findById(req.params.id)
        .then(Data => {
            res.render('work/work_detail', {data:Data})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/', function(req, res, next) {
    Work.find()
    .then(dataFromDb=>{
        console.log(dataFromDb)
     res.render('work/works', {data:dataFromDb});
    })
    .catch(err=>{
        console.log(err)
    })
});

module.exports = router;
