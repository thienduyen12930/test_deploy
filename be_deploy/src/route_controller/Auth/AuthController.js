const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body: ", req.body);

    const user = await User.findOne({ email }).select("+password");

    // Nếu không tìm thấy user
    if (!user) {
      return res.status(401).json({ MsgNo: "Email or password is incorrect" });
    }

    // Nếu không có role
    if (!user.role) {
      return res.status(401).json({ MsgNo: "Email or password is incorrect" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ MsgNo: "Email or password is incorrect" });
    }

    // Kiểm tra xác minh email
    if (!user.isVerified) {
      return res.status(403).json({ MsgNo: "Your email is not verified" });
    }

    // Tạo token và trả về dữ liệu
    const token = generateToken(user);
    res.json({
      Data: {
        token: token,
        user: user,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ MsgNo: "Internal server error" });
  }
};
