const express = require('express');
const router = express.Router();
const paginate = require("express-paginate");


const Work = require('../models/work');

/* GET users listing. */

router.get('/:id', (req, res, next)=>{
    Work.findById(req.params.id)
        .then(Data => {  
            res.render('work/work_detail', {data:Data, user:req.user, layout: false})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/', (req, res, next) => {
    const options = {
        lean: true,
        limit:req.query.limit,
        page:req.query.page
    }
    Work.paginate({}, options, (err, result)=> {
        let next;
        let previous;
        let next_number;
        let previous_number; 
        let start_number = 1;
        let end_number = 6;

        (result.page < result.pages)? next = true: next = false;
        (result.page == 1)? previous = false: previous = true;
      
        next_number = (result.page)+1;
        previous_number = (result.page)-1;

        start_number = (((result.page) -1) * 6 ) + 1;
        end_number = (result.page) * 6;
        (end_number > result.total)? end_number = result.total:'';

    res.render('work/works', {data:result.docs, start_number:start_number, end_number:end_number, next_number:next_number, next_page: next, previous_number:previous_number, previous_page: previous, total:result.total,  layout: false});
    });
  });

router.get("/result/:type", (req, res)=>{
    let type = req.params.type;
    let next;
    let previous;
    let next_number;
    let previous_number; 
    let start_number = 1;
    let end_number = 6;
    let type_name;

    const options = {
        lean: true,
        limit:req.query.limit,
        page:req.query.page
    }
   
    if(type == "next"){
        Work.paginate({useNext:"on"}, options, (err, result)=>{
            type_name = "next.js";
            (result.page < result.pages)? next = true: next = false;
            (result.page == 1)? previous = false: previous = true;
            next_number = (result.page)+1;
            previous_number = (result.page)-1;
            start_number = (((result.page) -1) * 6 ) + 1;
            end_number = (result.page) * 6;
            (end_number > result.total)? end_number = result.total:'';
            res.render("work/result", {data:result.docs, layout: false, type_name:type_name, start_number:start_number, end_number:end_number, next_number:next_number, next_page: next, previous_number:previous_number, previous_page: previous, type:type, total:result.total, next:true, node:false, mongo:false, react:false})
        })
    } else if (type == "react"){
        Work.paginate({useReact:"on"}, options, (err, result)=>{
            type_name = "react.js";
            (result.page < result.pages)? next = true: next = false;
            (result.page == 1)? previous = false: previous = true;
            next_number = (result.page)+1;
            previous_number = (result.page)-1;
            start_number = (((result.page) -1) * 6 ) + 1;
            end_number = (result.page) * 6;
            (end_number > result.total)? end_number = result.total:'';
            res.render("work/result", {data:result.docs, type:type, layout:false, type_name:type_name, start_number:start_number, end_number:end_number, next_number:next_number, next_page: next, previous_number:previous_number, previous_page: previous, total:result.total, next:false, node:false, mongo:false, react:true})
        })
    } else if (type == "mongo"){
        Work.paginate({useMongo:"on"}, options, (err, result)=>{
            type_name = "mongoDB";
            (result.page < result.pages)? next = true: next = false;
            (result.page == 1)? previous = false: previous = true;
            next_number = (result.page)+1;
            previous_number = (result.page)-1;
            start_number = (((result.page) -1) * 6 ) + 1;
            end_number = (result.page) * 6;
            (end_number > result.total)? end_number = result.total:'';
            res.render("work/result", {data:result.docs, type:type, layout:false, type_name:type_name, start_number:start_number, end_number:end_number, next_number:next_number, next_page: next, previous_number:previous_number, previous_page: previous, total:result.total, next:false, node:false, mongo:true, react:false})
        })
    } else if (type == "node"){
        Work.paginate({useNode:"on"}, options, (err, result)=>{
            type_name = "node.js";
            (result.page < result.pages)? next = true: next = false;
            (result.page == 1)? previous = false: previous = true;
            next_number = (result.page)+1;
            previous_number = (result.page)-1;
            start_number = (((result.page) -1) * 6 ) + 1;
            end_number = (result.page) * 6;
            (end_number > result.total)? end_number = result.total:'';
            res.render("work/result", {data:result.docs, type:type, layout:false, type_name:type_name, start_number:start_number, end_number:end_number, next_number:next_number, next_page: next, previous_number:previous_number, previous_page: previous, total:result.total, next:false, node:true, mongo:false, react:false})
        })
}
})

module.exports = router;
