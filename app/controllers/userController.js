const User = require("../models/user");

// Kullanıcı kaydı için controller
async function registerUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
  
      // Oluşturulan kullanıcıyı tekrar çekip response olarak gönderelim
      const savedUser = await User.findOne({ username }, { password: 0 }); // Parolayı getirmeme için projection
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Kullanıcı kaydı hatası:', error);
      res.status(500).json({ success: false, message: 'Sunucu hatası' });
    }
  }

// Kullanıcı girişi için controller
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        message: "Giriş başarılı",
        user: { username: user.username },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Kullanıcı adı veya şifre hatalı" });
    }
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
}

// Tüm kullanıcıları getirme için controller
async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Kullanıcı getirme hatası:", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
}

// Belirli bir kullanıcıyı getirme için controller
async function getUserByUsername(req, res) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ success: false, message: "Kullanıcı bulunamadı" });
    }
  } catch (error) {
    console.error("Kullanıcı getirme hatası:", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
}

module.exports = { registerUser, loginUser, getUsers, getUserByUsername };
