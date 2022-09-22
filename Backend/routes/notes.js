const express = require('express')
const router = express.Router()
router.get('/', (req, res)=>{
    obj={
        a:"Nihal",
        b: 9078
    }
    res.json(obj);
})
module.exports = router