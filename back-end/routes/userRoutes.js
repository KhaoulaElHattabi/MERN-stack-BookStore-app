const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")



router.route("/").get(userController.getUsers)
                .post(userController.addUser)


router.route('/login').post(userController.userLogin)


router.route("/:id").get(userController.getUser).delete(userController.deleteUser).put(userController.updateUser)
router.route("/:id/").put(userController.updateUserMP)

module.exports=router
