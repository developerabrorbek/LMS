import User from "../models/user.model.js";

class AuthController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  // LOGIN
  signin = async (req, res) => {
    const foundedUser = await this.#_userModel.find(req.body)

    res.send({
      message: "success",
      data: foundedUser
    });
  };

  // REGISTER
  signup = async (req, res) => {

    res.send("ok")
  };
}

export default new AuthController();
