import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updatebook.args';

@Injectable()
export class BookService {

    constructor(@InjectRepository(BookEntity) public readonly BookRepo : Repository<BookEntity>){
    }

     async findAllbooks(): Promise<BookEntity[]>{
     let books = await this.BookRepo.find();
     return books;
     }
     
     async findBookbyId(id : number): Promise<BookEntity>{
        let book = await this.BookRepo.findOne({where:{id:id}})
        return book;
     }
     
     async deleteBook(id :number) : Promise<String>{
        await this.BookRepo.delete(id);
        return "Book has been deleted";
     }
  
     async Addbook(addBookArgs: AddBookArgs) : Promise<String>{
        let book : BookEntity = new BookEntity();
        book.title = addBookArgs.title;
        book.price = addBookArgs.price;
        await this.BookRepo.save(book);
        return "new book added";
     }

     async updatebook(updateBookArgs: UpdateBookArgs) : Promise<String>{
        let book : BookEntity = await this.BookRepo.findOne({where : {id: updateBookArgs.id}});
        book.title = updateBookArgs.title;
        book.price = updateBookArgs.price;
        await this.BookRepo.save(book);
        return "book Succesfully updated";
     }


}
