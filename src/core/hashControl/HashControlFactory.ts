import BcryptHashControl from "./BcryptHashControl";

export default class HashControlFactory {
  create() {
    let hashControl = BcryptHashControl;
    return hashControl;
  }
}
