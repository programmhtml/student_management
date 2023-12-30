var express = require('express');
var router = express.Router();
var admin =require('../controller/adminscontroller');
var auth =require('../middleware/auth');

/* GET home page. */
router.post('/',admin.login);
router.get('/logout',admin.logout);
router.post('/register',auth.admin, admin.admin_register);
router.get('/views',auth.admin,admin.views);
router.get('/view_fac/:id',auth.admin,admin.view_fac);
router.get('/view_student',auth.admin,admin.student_view);
router.get('/view/:id',auth.admin,admin.views_student);
router.post('/update/:id',auth.admin,admin.update);
router.get('/deletes/:id',auth.admin,admin.deletes);
router.get('/update_search/:id',auth.admin,admin.update_search);
router.post('/add_course',auth.admin,admin.add_course);
router.get('/views_course',auth.admin,admin.views_course);
router.get('/view_language',auth.admin,admin.view_language);
router.post('/add_language',auth.admin,admin.add_language);


module.exports = router;
