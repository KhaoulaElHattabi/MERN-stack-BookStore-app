const catalService=require("../services/catalogueServices")


const getBooks=async(req,res)=>{
    try{
        const books=catalService.getAllBooks()
        res.status(200).json(book)
    }catch(error){
        res.status(500).json(error)
    }
}

const getBook=async(req,res)=>{
    try{
        const books=await catalService.getBookById(req.params.id)
        res.status(200).json(books)
    }catch(error){
        res.status(500).json(error)
    }
}


const addBook=async(req,res)=>{
    try{
        const books=await catalService.createBook(req.body)
        res.status(200).json(books)
    }catch(error){
        res.status(500).json(error)
    }
}


const addCategory=async(req,res)=>{
    try{
        const categories=await catalService.createCategory(req.body)
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json(error)
    }

}

const deleteCategory=async(req,res)=>{
    try{
        const categories=await catalService.deleteCategoryById(req.params.id)
        req
    }


}

