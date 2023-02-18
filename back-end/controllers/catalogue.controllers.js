const catalService=require("../services/catalogueServices")


const getBooks=async(req,res)=>{
    try{
        const book=catalService.getAllBooks()
        res.status(200).json(book)
    }catch(error){
        res.status(500).json(error)
    }
}

const getBook=async(req,res)=>{
    try{
       await catalService.getBookById(req.params.id)
        res.status(200).json("Book deleted succesfully !")
    }catch(error){
        res.status(500).json(error)
    }
}
const deleteBook=async(req,res)=>{
    try{
        const book=await catalService.deleteBookById(req.params.id)
        res.status(200).json(book)
    }catch(error){
        res.status(500).json(error)
    }
}
const updateBook=async(req,res)=>{
    try{
      await catalService.updateBook(req.body)
        res.status(200).json("Book modified succesfully")
    }catch(error){
        res.status(500).json(error)
    }
}

const addBook=async(req,res)=>{
    try{
        await catalService.createBook(req.body)
        res.status(200).json("Livre bien ajouté")
    }catch(error){
        res.status(500).json(error)
    }
}


const addCategory=async(req,res)=>{
    try{
       await catalService.createCategory(req.body)
        res.status(200).json("Category added succesfully!")
    }catch(error){
        res.status(500).json(error)
    }

}

const deleteCategory=async(req,res)=>{
    try{
    await catalService.deleteCategoryById(req.params.id)
        res.status(200).json("Category deleted succesfully")
    }catch(error){
        res.status(500).json(error)
    }
}
const getCategories=async(req,res)=>{
    try{
        const categories=await catalService.getAllCategories()
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json(error)
    }
}


const updateCategory=async(req,res)=>{
    try{
      await catalService.updateCategory(req.body)
        res.status(200).json("Catgory Modifié");
    }catch(error){
        res.status(500).json(error)
    }
} 

module.exports={
    getBook,getBooks,addBook,updateBook,deleteBook,getCategories,addCategory,deleteCategory,updateCategory
}
