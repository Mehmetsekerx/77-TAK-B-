# Mehmet Şeker – 77 İş Takibi

400 numaralı, ortak ve anlık güncellenen sayı seçme uygulaması.

## Özellikler
- 1–400 arası sayılar
- Boş sayılar kırmızı, alınan sayılar yeşil
- Sayının üzerinde alan kişinin adı
- Aynı sayının iki kişi tarafından aynı anda alınmasını engelleyen sunucu kontrolü
- Şifresiz erişim
- Herkese anlık güncelleme (Socket.IO)
- Alınmış sayıyı tekrar boşaltma

## İnternette yayımlama (Render örneği)
Bu proje Node.js sunucusu gerektirir; yalnızca HTML dosyasını telefona kaydetmek canlı paylaşım sağlamaz.

1. Bu klasörü bir GitHub deposuna yükle.
2. Render.com hesabı açıp **New + → Web Service** seç ve GitHub deposunu bağla.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment Variables bölümüne `NODE_ENV=production` ekle.
6. Deploy et. Render'ın verdiği HTTPS adresini paylaş.

## Önemli notlar
- Şifre kaldırıldığı için bağlantıya sahip herkes listeyi görebilir ve sayı alabilir.
- Veriler şu an sunucu belleğinde tutulur. Sunucu yeniden başlatılırsa sayılar sıfırlanır. Kalıcı kullanım için veritabanı eklenmelidir.
- Bu sürümde herkes alınmış sayıyı boşaltabilir.
