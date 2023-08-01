import BookModel from "../../domain/schemas/bookModel/BookModel";
import BaseRepository from "../BaseRepository";

class BookRepository extends BaseRepository {
  constructor() {
    super();
  }
  
  public model() {
    return BookModel;
  }
}

export default BookRepository;
