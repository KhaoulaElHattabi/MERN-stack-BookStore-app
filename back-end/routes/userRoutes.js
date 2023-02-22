const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")



router.route("/").get(userController.getUsers)
                .post(userController.addUser)


router.route('/login').post(userController.userLogin)


router.route("/:id").get(userController.getUser)

module.exports=router
