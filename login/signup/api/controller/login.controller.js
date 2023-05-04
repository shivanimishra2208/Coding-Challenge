const users = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("hello");
const userLogin = async (req, res) => {
  console.log("Received login request");
  try {
    const { email, password } = req.body;

    let user;
    // check if a user with email is present in the users array
    let flag = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        flag = true;
        user = users[i];
        break;
      }
    }

    if (!flag) {
      console.log("User not found");
      res.status(401).send({ message: "Invalid email or password" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    console.log("Invalid password");
    if (!isValidPassword) {
      res.status(401).send({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    localStorage.setItem("token", token);

    const JWT_KEY = process.env.JWT_KEY_NAME || "jwt";
    res
      .header({ JWT_KEY: token }) // inject jwt in headers
      .cookie(JWT_KEY, token) // inject jwt in cookies
      .send({ token }); // keep token in body
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ message: "Something went wrong. Please try again later!" });
  }
};
const signUp = async (req, res) => {
  try {
    const { firstname, lastname, company, email, password } = req.body;
    if (!email || !password) {
      res.send("Wrong email or passsword");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    // create user object containing firstname, lastname, company, email, passwordHash
    let user = {
      firstname,
      lastname,
      company,
      email,
      passwordHash,
    };

    // add user object to users array
    users.push(user);

    res.send({ message: "Registration successfully done." });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = {
  userLogin,
  signUp,
};
