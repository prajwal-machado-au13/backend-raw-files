const express = require('express')
const router = express.Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Employee = require("../models/Employee");


router.get('/', (req, res) => {
    res.render("employee/add-edit-employee", {
        viewTitle: "Insert Employee"
    });
});


router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    console.log(req.body)
    // console.log(res)
    const result = await cloudinary.uploader.upload(req.file.path);
    // res.json(result)
    // Create new user
    // console.log(req.body)
    let employee = new Employee({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.email,
      phone: req.body.address,
      pancard: req.body.pancard,
      cloudinary_id: result.secure_url,
      basicsalary: req.body.basicsalary,
      da: req.body.da,
      hra: req.body.hra,
      medical: req.body.medical,
      proftax: req.body.proftax,
      incometax: req.body.incometax,
      providentfund: req.body.providentfund
    });
    // Save user
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
