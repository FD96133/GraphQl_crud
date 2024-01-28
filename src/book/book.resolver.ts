import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Book } from "./schema/book.schema";
import { BookService } from "./book.service";
import { AddBookArgs } from "./args/addbook.args";
import { UpdateBookArgs } from "./args/updatebook.args";

@Resolver(of => Book)
export class BookResolver{
    constructor(private readonly bookService : BookService){}
   
    @Query(returns => [Book],{name: 'books'})
    getAllBooks(){
        return this.bookService.findAllbooks();
    }
   
    @Query(returns => Book,{name: 'bookById'})
    getBookbyId(@Args({name : 'bookId',type:()=> Int})id : number){
        return this.bookService.findBookbyId(id);
    }
   
    @Mutation(returns => String,{name: 'deleteBook'})
    deleteBookbyId(@Args({name : 'bookId',type:()=> Int})id : number){
        return this.bookService.deleteBook(id);
    }
   
    @Mutation(returns => String,{name: 'addBook'})
    addBook(@Args('addBookArgs')addBookArgs : AddBookArgs){
        return this.bookService.Addbook(addBookArgs);
    }
   
    @Mutation(returns => String,{name: 'updateBook'})
    updateBook(@Args('updateBookArgs')updateBookArgs : UpdateBookArgs){
        return this.bookService.updatebook(updateBookArgs);
    }




}