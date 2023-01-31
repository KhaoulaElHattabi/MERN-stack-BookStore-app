 const Book=require("../models/Book")
 const Category=require("../models/Category")


 const getAllBooks=async()=>{
    return await Book.find()
 }

 const createBook=async(b)=>{
    return await Book.create(b)
 }

 const getBookById=async(id)=>{
    return await Book.findByIdAndDelete(id)      
 }

 const updateBook=async(b)=>{
    return await Book.findByIdAndUpdate(b._id,b)
 }


 const getAllCategories=async()=>{
    return await Category.find()
 }

 const createCategory=async(c)=>{
    return await Category.create(c)
 }

const deleteCategoryById=async(id)=>{
    return await Category.findByIdAndDelete(id)
}
const deleteBookById=async(id)=>{
   return await Book.findByIdAndDelete(id)
}

module.exports={
    getAllBooks,
    getBookById,
    createBook,
    deleteBookById,
    getAllCategories,
    createCategory,
    deleteCategoryById,
    updateBook
}




