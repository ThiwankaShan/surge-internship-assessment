const express = require('express')
const router= express.Router()

router.get('/', (req, res)=>{
    console.log("user endpoint got called")
    res.json({msg:'user home'})
})

module.exports = router