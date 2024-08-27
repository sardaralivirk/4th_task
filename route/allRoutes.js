const express=require('express')
const { model } = require('mongoose')
const router=express.Router()

const {userInformation,alluser,softdelete,createrelation,deletePost,createuser,userPost,forgetPassword,reasetpwd} = require('../controller/userallcontroller')
router.post('/signin',createuser)
router.post('/post',userPost)
router.get('/userInfo',userInformation)
router.get('/alluser',alluser)
router.get('/softdelete',softdelete)
router.put('/createrelation',createrelation)
router.delete('/deletepost',deletePost)
router.post('/forgetPassword',forgetPassword)
router.post('/reasetpwd',reasetpwd)



module.exports=router;