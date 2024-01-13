# Kullanıcı Kayıt Uygulaması

Bu basit web uygulaması, kullanıcıların kayıt olmasını sağlayan bir arayüz ve bu kayıtları MongoDB veritabanına kaydeden bir Express.js uygulamasını içerir. Kullanıcılar, kullanıcı adı ve şifrelerini girerek kayıt olabilirler.

## Kullanılan Teknolojiler

- **Express.js:** Web uygulaması ve sunucu tarafı işlemleri için kullanılan hafif bir Node.js framework'ü.
- **MongoDB:** Veritabanı olarak kullanılan NoSQL veritabanı.
- **Mongoose:** MongoDB'yi Node.js uygulamalarıyla kullanabilmek için bir ODM (Object Data Modeling) kütüphanesi.
- **Cors:** Tarayıcıda çalışan istemciden kaynak isteğin yapılabilmesi için kullanılan bir middleware.

## Nasıl Çalışır?

1. Kullanıcı, web arayüzü üzerinden kullanıcı adı ve şifresini girer.
2. Kullanıcı "Register" butonuna tıkladığında, istek Express.js sunucusuna yönlendirilir.
3. Express.js sunucusu, gelen isteği işler, kullanıcıyı MongoDB'ye kaydeder ve işlemin sonucunu istemciye geri gönderir.

## Nasıl Başlatılır?

1. Proje dizininde terminali açın.
2. `npm install` komutunu kullanarak bağımlılıkları yükleyin.
3. `npm start` komutu ile uygulamayı başlatın.
4. Tarayıcınızda `http://localhost:4000` adresine giderek uygulamayı kullanmaya başlayın.

## Notlar

- Bu uygulama, basit bir örnek olup gerçek uygulamalarda güvenlik önlemleri daha kapsamlı olmalıdır.
- Kullanıcı adı benzersizliği ve şifre güvenliği gibi unsurlar üzerinde geliştirmeler yapılabilir.
