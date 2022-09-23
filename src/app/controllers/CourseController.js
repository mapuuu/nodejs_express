const Course = require('../models/Course');
const slugify = require('slugify');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [Get /courses/show]
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [Get /courses/create]
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST /courses/store]
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);

        // res.send('COURSE SAVED!!!');
        res.render('courses/create');
    }

    // [Get /courses/:id/edit]
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((courses) =>
                res.render('courses/edit', {
                    courses: mongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [Put /courses/:id]
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        formData.slug = slugify(formData.name, {
            remove: /[*+~.,()'"!:@]/g,
            lower: true,
            strict: true,
            locale: 'vi',
        });

        //update course after adding image, slug
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [Delete /courses/:id]
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [Force-Delete /courses/:id/force]
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [Patch /courses/:id/restore]
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [Post /courses/handle-form-actions]
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!' });
        }
    }

    // [Post /courses/restore-form-actions]
    restoreFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDelete':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!' });
        }
    }
}
module.exports = new CourseController();
