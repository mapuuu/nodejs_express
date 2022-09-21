const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class SiteController {
    // [Get /]
    index(req, res, next) {

        // Ex1: Callback
        // Course.find({}, function(err, courses) {
        //     if(!err) {
        //         res.json(courses);
        //     } else{
        //         next(err);
        //     }
        // });

        // Ex2:  Promiss
        Course.find({}) 
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }

    // [Get /search]
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
