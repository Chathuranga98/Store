const router = require('express').Router();
let staff_model = require('../models/staff');
const timestamp = require('time-stamp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Add Employees
router.route('/addStaff').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

    const fullName = req.body.fullName;
    const address = req.body.address;
    const position = req.body.position;
    const nic = req.body.nic;
    const username = req.body.username;
    const password = hashedPass;
    const qualification = req.body.body_qualification;
    const tel = req.body.tel;
    const email = req.body.email;

    const newStaffAdd = new staff_model({fullName, address, position, nic, username, password, qualification, tel, email});

    newStaffAdd.save()
        .then(() => res.json('Staff Adding Success!'))
        .catch((err) => {
            console.log(err);
        });
    })
});

//Retrieve All News
router.route("/allStaff").get((req,res) => {
    
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  
  
//One Staff Details
router.route("/oneStaff/:userName").get((req,res) => {
    
    let userName = req.params.userName; 
    staff_model.find({username : userName}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  
  
//Delete Staff Details
router.route("/deleteStaff/:ID").delete(async (req, res) => {
    let ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

//Update Staff Details
router.route('/updateStaff').put((req, res)=>{
    const fullName = req.body.fullName;
    const address = req.body.address;
    const position = req.body.position;
    const nic = req.body.nic;
    const qualification = req.body.body_qualification;
    const tel = req.body.tel;
    const email = req.body.email;
    const username = req.body.userName;

    const updateStaff={fullName,address,position,nic,qualification,tel,email}
    staff_model.findOneAndUpdate({username:username},updateStaff).then(() => {       
        res.status(200).send({status :"Staff updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
          
});

//Login
router.route('/login').post((req, res, next) => {
    let username = req.body.userName;
    let password = req.body.password;

    staff_model.findOne({$or: [{username:username}]})
    .then(systemreg =>{
        if(systemreg){
                bcrypt.compare(password, systemreg.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        staff_model.find({username:username})
                        .then(UserSearch => res.json({
                            message:UserSearch[0].position,
                        }))
                        .catch(err => res.status(400). res.json({
                            message:false,
                        }))      
                    }else{
                        console.log(err);
                         res.json({
                            message: false
                        })    
                    }
                })

        }else{
            res.json({
                message: false
            })
        }
    })
});
module.exports = router;