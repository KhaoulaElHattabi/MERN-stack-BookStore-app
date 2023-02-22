const express=require("express")
const router=express.Router()
const catalController=require("../controllers/catalogue.controllers")


router.route("/book").get(catalController.getBooks).post(catalController.addBook)

router.route("/books/:id").put(catalController.updateBook).delete(catalController.deleteBook).get(catalController.getBook)


module.exports=router