var express = require('express');
var router = express.Router();
var member =require('../controller/membercontroller');
var auth =require('../middleware/auth')

/* GET home page. */
router.post('/member_login',member.login);
router.get('/logout',member.logout);
router.post('/register',auth.member,member.register);
router.get('/student_views',auth.member,member.student_views);
router.get('/view/:id',auth.member,member.views_student);
router.get('/all_members',auth.member,member.all_members);
router.get('/your_student',auth.member,member.your_student);
router.get('/search_fee/:id',auth.member,member.search_fee);
router.get('/fee_update/:id',auth.member,member.fee_update);
router.get('/deletes/:id',auth.member,member.deletes);
router.post('/update/:id',auth.member,member.update);
router.post('/update_student/:id',auth.member,member.update_student)
router.get('/delete_student/:id',auth.member,member.delete_student)
router.get('/views_course',auth.member,member.views_course);
router.get('/paidfee/:id',auth.member,member.paidfee)
router.get('/pendingfee',member.pendingfee)

module.exports = router;
