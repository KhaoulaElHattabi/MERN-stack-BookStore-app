const express=require("express")
const router=express.Router()
const catalController=require("../controllers/catalogue.controllers")
router.route("/categories").get(catalController.getCategories).post(catalController.addCategory)
router.route("/categories/:id").delete(catalController.deleteCategory)


module.exports=router