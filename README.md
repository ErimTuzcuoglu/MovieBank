# MovieBank Geliştirici Dökümantasyonu

# Giriş

- Bu dökümantasyonda React.js ile yazılmış MovieBank uygulaması bulunmaktadır. Site üzerinden kullanıcı kaydı, kullanıcı girişi , yorum yapma , puan verme , film listeleri oluşturma, filmlerin detaylı bilgilerini gösterme, oyuncuların biyografilerini gösterme, tv dizilerini gösterme gibi farklı işlemler yapılabilmektedir. 
- Api ile ilgili bölümler için detaylı bilgi: https://github.com/nafidurmus/moviebank_api

## *Kullanılan teknolojiler*

* [React.Js](https://reactjs.org/) - JavaScript Framework 
* [Ruby on Rails](https://rubyonrails.org) - Web framework 
* [Postgresql](https://www.postgresql.org/) - Database

# Kurulum
- [nodejs.org](https://nodejs.org/en/download/) üzerinden işletim sisteminize uygun nodejs sürümünü yükleyin.
- React.Js kurulumunu güncel olarak [Reactjs.org](https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial) üzerinden bulabilirsiniz.
- Aşağıdaki komutlar ile Ruby ve Postgresql kurulumu yapın.
```
$ sudo apt-get update //sistemi güncelleyelim 
$ sudo apt-get install curl // rvm yüklemek için curl kuralım
$ \curl -L https://get.rvm.io | bash -s stable --ruby // curl i indirelim
// rvm i yükledikten sonra aşağıdaki kodları sırayla çalıştıralım.
$ rvm get stable --autolibs=enable
$ rvm install ruby
$ rvm --default use ruby-2.5.1

$ gem -v // 2.5.1

$ gem install rails --version=5.2.1

$ rails -v => 5.2.1

$ sudo apt-get install postgresql // database i indirmek için

```
# Çalıştırmak için
Linux üzerinde terminal üzerinden proje klasörüne gelin, proje klasörünün içinde:

```
# (Linux için Reactjs)
$ npm start
# SSL güvenli giriş ile çalıştırmak için
$ HTTPS=true npm start


# (Linux için Rails)
$ git clone this repo
$ cd repo_name
$ bundle install // kütüphaneler için gerekli
$ rails db:create // database oluşturma
$ rails db:migrate // database ayarları
$ rails s -p 3001
```

## Contributing

* **[Nafi Durmuş](https://github.com/nafidurmus)** 
* **[Erim Tuzcuoglu](https://github.com/ErimTuzcuoglu)**  
* **[Sefa Emrahoglu](https://github.com/sefaemrahoglu)** 
