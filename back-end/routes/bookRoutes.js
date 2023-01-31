const express=require("expres")
const router=express.Router()
const catalController=require("../controllers/catalogue.controllers")


router.router("/book").get(catalController.getBooks).post(catalController.addBook)
router.router("/books/:id").put(catalController.updateBook).delete(catalController.deleteBook).get(catalController.getBook)


module.exports=router