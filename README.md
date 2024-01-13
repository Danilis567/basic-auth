# Kullanıcı Kayıt Uygulaması

Bu basit web uygulaması, kullanıcıların kayıt olmasını sağlayan bir Express.js uygulamasını içerir. Kullanıcılar, HTTP istemcisi (örneğin, Postman) kullanarak kullanıcı adı ve şifrelerini girerek kayıt olabilirler.

## Kullanılan Teknolojiler

- **Express.js:** Web uygulaması ve sunucu tarafı işlemleri için kullanılan hafif bir Node.js framework'ü.
- **MongoDB:** Veritabanı olarak kullanılan NoSQL veritabanı.
- **Mongoose:** MongoDB'yi Node.js uygulamalarıyla kullanabilmek için bir ODM (Object Data Modeling) kütüphanesi.
- **Cors:** Tarayıcıda çalışan istemciden kaynak isteğin yapılabilmesi için kullanılan bir middleware.

## Nasıl Çalışır?

1. Kullanıcı, HTTP istemcisini (örneğin, Postman) kullanarak kullanıcı adı ve şifresini içeren bir POST isteği oluşturur.
2. Bu istek, Express.js sunucusuna yönlendirilir ve sunucu gelen isteği işler.
3. Express.js sunucusu, gelen isteği işleyerek kullanıcıyı MongoDB'ye kaydeder ve işlemin sonucunu istemciye geri gönderir.

## Nasıl Başlatılır?

1. Proje dizininde terminali açın.
2. `npm install` komutunu kullanarak bağımlılıkları yükleyin.
3. `npm start` komutu ile uygulamayı başlatın.
4. HTTP istemcisini kullanarak `http://localhost:4000/users/register` endpoint'ine POST isteği göndererek uygulamayı kullanmaya başlayın.

## Ayrıntılar
[Ek detaylar](https://github.com/Danilis567/basic-auth/blob/main/app/doc.md).
- Uygulama, MongoDB'de "users" adında bir koleksiyon kullanarak kullanıcıları saklar.
- Kullanıcılar, kullanıcı adı ve şifre ile temsil edilir.
- MongoDB'deki kullanıcı koleksiyonunda "username" alanı benzersiz olmalıdır, bu nedenle aynı kullanıcı adıyla kayıt yapılmaya çalışıldığında benzersiz anahtar hatası alınabilir.
- HTTP isteği başarılı olduğunda, Express.js sunucusu yeni kullanıcıyı MongoDB'ye kaydeder ve kullanıcının bilgilerini JSON formatında istemciye geri gönderir.
- Uygulama, güvenlik açısından temel bir örnektir ve gerçek uygulamalarda HTTPS ve daha kapsamlı güvenlik önlemleri kullanılmalıdır.
- Kullanıcı adı benzersizliği ve şifre güvenliği gibi unsurlar üzerinde geliştirmeler yapılabilir.

![image](https://github.com/Danilis567/basic-auth/assets/134603964/b473f477-69e4-46d2-b302-3f8640cabd87)
