const RegiStationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  //   validator for npm packages

  email: {
    type: String,
    required: true,
    minlength: 3,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },

  gender: {
    type: String,
    required: true,
  },

  phone_Number: {
    type: Number,
    required: true,
    minlength: [9, "Minlength is 9 digits"],
    maxlength: [10, "Maxlength is 10 digits"],
    unique: true,
    validate(value) {
      if (value < 10) {
        throw new Error("phone_Number is at least 10 digits");
      }
    },
  },

  //   custom valdation for  passwrd for methods

  password: {
    type: String,
    required: true,
    minlength: 6,
    // maxlength: 8,
    validate: {
      validator: function (value) {
        return value.length < 6;
      },
      message: "password at least 6 character",
    },
  },

  confirm_password: {
    type: String,
    required: true,
    minlength: 6,
    // maxlength: 8,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
