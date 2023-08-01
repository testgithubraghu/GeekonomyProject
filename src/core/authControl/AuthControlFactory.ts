import JwtAuthControl from "./JwtAuthControl";

export default class AuthControlFactory {
  public create(): JwtAuthControl {
    let authControl = new JwtAuthControl();
    return authControl;
  }
}
