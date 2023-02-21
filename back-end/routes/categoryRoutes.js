const express=require("express")
const router=express.Router()
const catalController=require("../controllers/catalogue.controllers")


router.route("/").get(catalController.getCategories).post(catalController.addCategory)

router.route("/:id").delete(catalController.deleteCategory).put(catalController.updateCategory).get(catalController.getCategory)


module.exports=router