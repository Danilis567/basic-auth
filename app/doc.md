# User Controller Açıklaması

Bu dosya, kullanıcı işlemlerini yöneten Express.js kontrolcülerini içerir. Her bir kontrolcü fonksiyonu, belirli bir HTTP istek metoduna ve endpoint'ine karşılık gelir ve bu istekleri işleyerek uygun yanıtları döner.

## Fonksiyonlar ve İşlevleri

### 1. Kullanıcı Kaydı Yapma (registerUser)

- **Endpoint:** `/users/register`
- **HTTP Metodu:** POST
- **Açıklama:** Yeni bir kullanıcı kaydı oluşturur. Kullanıcı adı ve şifre, HTTP isteği gövdesinde iletilir.
- **İlgili Model Metodu:** `user.save()`
- **HTTP Yanıtları:**
  - Başarılı kayıt (201 Created): Yeni oluşturulan kullanıcı bilgileriyle birlikte.
  - Hata durumu (500 Internal Server Error): Sunucu hatası durumunda.
 
Kod:  
```jsx
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

```

### 2. Kullanıcı Girişi Yapma (loginUser)

- **Endpoint:** `/users/login`
- **HTTP Metodu:** POST
- **Açıklama:** Var olan bir kullanıcının giriş yapmasını sağlar. Kullanıcı adı ve şifre, HTTP isteği gövdesinde iletilir.
- **İlgili Model Metodu:** `User.findOne()`
- **HTTP Yanıtları:**
  - Başarılı giriş (200 OK): Giriş başarılı ve kullanıcı bilgileriyle birlikte.
  - Hatalı giriş (401 Unauthorized): Kullanıcı adı veya şifre hatalı durumunda.
  - Hata durumu (500 Internal Server Error): Sunucu hatası durumunda.

  kod:
 ```jsx
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
```


### 3. Tüm Kullanıcıları Getirme (getUsers)

- **Endpoint:** `/users`
- **HTTP Metodu:** GET
- **Açıklama:** Tüm kayıtlı kullanıcıları getirir.
- **İlgili Model Metodu:** `User.find()`
- **HTTP Yanıtı:**
  - Tüm kullanıcılar listesi.
 
kod:
```jsx
async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Kullanıcı getirme hatası:", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
}
```


### 4. Belirli Bir Kullanıcıyı Getirme (getUserByUsername)

- **Endpoint:** `/users/:username`
- **HTTP Metodu:** GET
- **Açıklama:** Belirli bir kullanıcının detaylarını getirir. Kullanıcı adı, URL'de belirtilir.
- **İlgili Model Metodu:** `User.findOne()`
- **HTTP Yanıtları:**
  - Kullanıcı bilgileri.
  - Kullanıcı bulunamadı (404 Not Found).
 
kod:
```jsx
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
```
---

Bu kontrolcü dosyası, belirli endpoint'lerle ilişkilendirilmiş kontrolcü fonksiyonlarını içerir. Her bir fonksiyon, ilgili model üzerinde MongoDB ile etkileşime geçerek isteği işler ve uygun yanıtları döner.

# User Model Açıklaması

Bu dosya, kullanıcıları temsil etmek ve MongoDB veritabanında depolamak için bir Mongoose şemasını ve modelini içerir.

## Kullanılan Paketler

- **mongoose:** MongoDB ile etkileşimde bulunmak için kullanılan bir ODM (Object Data Modeling) kütüphanesi.
- **bcrypt:** Şifrelerin güvenli bir şekilde saklanması ve doğrulanması için kullanılan bir kriptografi kütüphanesi.

## Kullanıcı Şema (userSchema)

Bu şema, kullanıcıları temsil eder ve MongoDB koleksiyonunda depolanacak her bir kullanıcının alanlarını tanımlar.

- **username:** Kullanıcı adını temsil eder. Benzersiz ve zorunlu bir alandır.
- **password:** Kullanıcının şifresini temsil eder. Zorunlu bir alandır.

## Kullanıcı Şifre Hashleme (userSchema.pre('save'))

Bu şema içerisinde tanımlanan bir middleware, kullanıcının şifresini kaydederken otomatik olarak hash'lemeyi sağlar. Bu, şifrelerin güvenli bir şekilde saklanmasını sağlar.

- `userSchema.pre('save', async function (next)`: Kullanıcının kaydedilmeden önce çalışan bir middleware.
- `if (!user.isModified('password')) return next();`: Şifre değiştirilmediyse, devam et.
- `const salt = await bcrypt.genSalt(10);`: Hash oluşturmak için kullanılacak tuzun oluşturulması.
- `const hash = await bcrypt.hash(user.password, salt);`: Kullanıcının şifresinin hash'lenmesi.
- `user.password = hash;`: Hashlenmiş şifrenin kullanıcının şifre alanına atanması.
- `next();`: Middleware'nin devam etmesi.

## Kullanıcı Modeli (User)

Bu model, Mongoose şeması üzerine inşa edilmiş ve MongoDB koleksiyonu ile etkileşimde bulunan bir modeldir.

- **User:** Kullanıcı şeması üzerinden oluşturulan model.

Bu dosya, kullanıcıları temsil etmek için gerekli olan şema ve modeli içerir ve şifre hash'leme işlemi için özel bir middleware içerir.

---

Bu şema ve model, güvenli bir şekilde kullanıcı bilgilerini saklamak ve MongoDB veritabanıyla etkileşimde bulunmak için kullanılır. Şifrelerin hash'lenmesi, kullanıcı güvenliğini artırmak için önemli bir adımdır.

# User Routes Açıklaması

Bu dosya, kullanıcı işlemlerini yöneten Express.js route'larını içerir. Bu route'lar, belirli HTTP istek metodlarına ve endpoint'lerine karşılık gelir ve ilgili işlemleri kontrolcü fonksiyonlara yönlendirir.

## Kullanılan Endpoints ve İşlevleri

### 1. Tüm Kullanıcıları Getirme (GET /users)

- **Endpoint:** `/users`
- **HTTP Metodu:** GET
- **Açıklama:** Bu endpoint, tüm kayıtlı kullanıcıları getirmek için kullanılır.
- **İlgili Kontrolcü Fonksiyon:** `userController.getUsers`

### 2. Belirli Bir Kullanıcıyı Getirme (GET /users/:username)

- **Endpoint:** `/users/:username`
- **HTTP Metodu:** GET
- **Açıklama:** Bu endpoint, belirli bir kullanıcının detaylarını getirmek için kullanılır. Kullanıcı adı, URL'de belirtilir.
- **İlgili Kontrolcü Fonksiyon:** `userController.getUserByUsername`

### 3. Kullanıcı Kaydı Yapma (POST /users/register)

- **Endpoint:** `/users/register`
- **HTTP Metodu:** POST
- **Açıklama:** Bu endpoint, yeni bir kullanıcı kaydı oluşturmak için kullanılır. Kullanıcı adı ve şifre, HTTP isteği gövdesinde iletilir.
- **İlgili Kontrolcü Fonksiyon:** `userController.registerUser`

### 4. Kullanıcı Girişi Yapma (POST /users/login)

- **Endpoint:** `/users/login`
- **HTTP Metodu:** POST
- **Açıklama:** Bu endpoint, var olan bir kullanıcının giriş yapmasını sağlamak için kullanılır. Kullanıcı adı ve şifre, HTTP isteği gövdesinde iletilir.
- **İlgili Kontrolcü Fonksiyon:** `userController.loginUser`

---

Bu dosya, kullanıcı işlemleri için belirlenmiş olan endpoint'leri ve bu endpoint'lerle ilişkilendirilmiş kontrolcü fonksiyonları içerir. Bu sayede, Express.js uygulamanızda kullanıcı işlemleri için bir API oluşturabilir ve bu rotaları kullanarak kullanıcıları yönetebilirsiniz.
