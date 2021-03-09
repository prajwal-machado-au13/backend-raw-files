const express = require('express')
const router = express.Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Employee = require("../models/Employee");


router.get('/add', (req, res) => {
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
      phone: req.body.phone,
      address: req.body.address,
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
    console.log(err.message);
    return res.json(err)
  }
});

router.get("/", async (req, res) => {
  try {
    let employee = await Employee.find();
    res.json(employee);
  } catch (err) {
    console.log(err);
  }
});


router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(employee.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      firstname: req.body.firstname || employee.firstname,
      lastname: req.body.lastname || employee.lastname,
      email: req.body.email || employee.email,
      phone: req.body.phone || employee.phone,
      address: req.body.address || employee.address,
      pancard: req.body.pancard || employee.pancard,
      cloudinary_id: result.secure_url || employee.secure_url,
      basicsalary: req.body.basicsalary || employee.basicsalary,
      da: req.body.da || employee.da,
      hra: req.body.hra || employee.hra,
      medical: req.body.medical || employee.medical,
      proftax: req.body.proftax || employee.proftax,
      incometax: req.body.incometax || employee.incometax,
      providentfund: req.body.providentfund || employee.providentfund
    };
    employee = await employee.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(employee);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let employee = await Employee.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(employee.cloudinary_id);
    // Delete user from db
    await employee.remove();
    res.json(employee);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
