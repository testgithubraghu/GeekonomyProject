interface AuthControlInterface {
  sign(valueToEncode, secret, options);
  decode(token, secret);
  decodeRequestHeader(req, secret);
}
export default AuthControlInterface;
