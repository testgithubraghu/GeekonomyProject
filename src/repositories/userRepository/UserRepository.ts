import BaseRepository from "../BaseRepository";
import UserModel from "../../domain/schemas/userModel/UserModel";

class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  public model() {
    return UserModel;
  }
}

export default UserRepository;
