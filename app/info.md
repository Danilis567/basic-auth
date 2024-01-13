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
