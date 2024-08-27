/**
 * Landing.js v0.1.0
 * https://github.com/vah7id/landing.js
 * MIT licensed
 *
 * Copyright (C) 2014 Vahid Taghizadeh (@vah7id)
 */

var LandingJs = {
    
    option: {
      _slide: false,
      _slideCount: null,
      _CountDown: false,
      _CountDownDate: null,
      _brand: 'Untitled',
      _description: 'No Description entered as config',
      _breif: null,
      _images: [],
    },

    currentSlider: 0,
    maxSliderCount: 5,
    
    start: function(config){
		  LandingJs._bingRequest(LandingJs.option._slideCount);
      LandingJs._setOptions(config);
      LandingJs._setContents();
    },

    _setOptions: function(config){
      console.log(config.slideCount)
      LandingJs.option[0] = config.slide;
      LandingJs.option[1] = config.slideCount;
      LandingJs.option[2] = config.countdown;
      LandingJs.option[3] = config.countdownTime;
      LandingJs.option[4] = config.brand;
      LandingJs.option[5] = config.description;
      LandingJs.option[6] = config.brief;
    },

    _setContents: function(){
      var container = document.getElementById('container');

      container.getElementsByTagName('h1')[0].innerHTML = LandingJs.option[4];
      container.getElementsByTagName('h4')[0].innerHTML = LandingJs.option[5];

      document.getElementById('brief').innerHTML = LandingJs.option[6];

      var year = LandingJs.option[3].split(',')[0];
      var month = LandingJs.option[3].split(',')[1];
      var day = LandingJs.option[3].split(',')[2];

      if(LandingJs.option[2]){
        var cdtimer = setInterval(function(){
          var cdtext = countdown(new Date(year,month,day)).toString();
          var cdel = document.getElementById('countdown');
          var splits = cdtext.split(',');
          var result = '';

          for(var i = 0 ; i < splits.length ; i++){
            var number = splits[i].split(' ')[0];
            var content = splits[i].split(' ')[1];
            if(content != 'hours')
              result = result + '<p><b>'+number+'</b><br /><span> '+content+'</span></p>';
          }
          cdel.innerHTML = result ;
        },1000);
      }


      if(LandingJs.option[0]){
        var slidertimer = setInterval(function(){
          var url = 'bing.com/'+LandingJs.option._images[LandingJs.currentSlider].getElementsByTagName('url')[0].innerHTML;
          var copyright = LandingJs.option._images[LandingJs.currentSlider].getElementsByTagName('copyright')[0].innerHTML;
          var body = document.getElementById('blur');
          body.style.backgroundImage = 'url("http://'+url+'")';
          document.getElementById('copyright').innerHTML = copyright;
          LandingJs.currentSlider++;

          if(LandingJs.currentSlider>=LandingJs.option[1])
            LandingJs.currentSlider = 0;

        },8000);
      }

    },

    _bingRequest: function(n){
    	var _url = LandingJs._urlGenerator();
    	LandingJs._loadXMLDoc(_url);
    },

    _urlGenerator: function(){
    	return 'data/bing.xml';
    },

    _loadXMLDoc: function(url){
  		var xmlhttp;
  		if (window.XMLHttpRequest)
  		  xmlhttp=new XMLHttpRequest();
  		else
  		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  		  xmlhttp.onreadystatechange=function() {
    		  if (xmlhttp.readyState==4 && xmlhttp.status==200) {

            var images = xmlhttp.responseXML.getElementsByTagName('images');

            for(var i = 0 ; i<images[0].childNodes.length ; i++)
              LandingJs.option._images[i] = images[0].childNodes[i];

            var url = 'bing.com/'+images[0].getElementsByTagName('url')[0].innerHTML;
            var copyright = images[0].getElementsByTagName('copyright')[0].innerHTML;
            var body = document.getElementById('blur');
            document.getElementById('container').style.minHeight = window.innerHeight-70+'px';
            body.style.backgroundImage = 'url("http://'+url+'")';
            document.getElementById('copyright').innerHTML = copyright;
    	    }
  	  	}
  		xmlhttp.open("GET",url,true);
  		xmlhttp.send();
  	}
};


function openModal(element) {
  // Предотвратить поведение ссылки по умолчанию
  event.preventDefault();

  // Получить ID модального окна из атрибута данных
  var modalId = element.getAttribute('data-modal-id');

  // Получить элемент модального окна по ID
  var modal = document.getElementById(modalId);

  // Отобразить модальное окно и добавить классы
  if (modal) {
      modal.style.display = 'block';
      modal.classList.add('t-popup_show');
      var container = modal.querySelector('.t-popup__container');
      if (container) {
          container.classList.add('t-popup__container-animated');
      }
  }
}

// Дополнительно: Добавить функцию для закрытия модального окна
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('t-popup_show');
      var container = modal.querySelector('.t-popup__container');
      if (container) {
          container.classList.remove('t-popup__container-animated');
      }
  }
}

// Дополнительно: Закрыть модальное окно при клике вне его
window.onclick = function(event) {
  var modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
      if (event.target == modal) {
          modal.style.display = 'none';
          modal.classList.remove('t-popup_show');
          var container = modal.querySelector('.t-popup__container');
          if (container) {
              container.classList.remove('t-popup__container-animated');
          }
      }
  });
}

function setPrices() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    let prices = {
        Standart: { main: 0, crossed: 0 },
        Business: { main: 0, crossed: 0 },
        Vip: { main: 0, crossed: 0 },
        Premium: { main: 0, crossed: 0 }
    };

    // Проверка, находится ли текущее время между средой 23:59 и субботой 23:59
    if ((day === 3 && hours === 23 && minutes >= 59) || (day > 3 && day < 6) || (day === 6 && hours < 23) || (day === 6 && hours === 23 && minutes < 59)) {
        prices = {
            Standart: { main: 4900, crossed: 27700 },
            Business: { main: 9900, crossed: 46300 },
            Vip: { main: 19900, crossed: 66400 },
            Premium: { main: 29900, crossed: 99700 }
        };
    } else {
        // Текущее время находится между субботой 23:59 и средой 23:59
        prices = {
            Standart: { main: 9900, crossed: 37700 },
            Business: { main: 14900, crossed: 56300 },
            Vip: { main: 29900, crossed: 76400 },
            Premium: { main: 39900, crossed: 119700 }
        };
    }

    return prices;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function displayPrices() {
    const currentPrices = setPrices();
    const standartCrossedPrice = formatPrice(currentPrices.Standart.crossed);
    const businessCrossedPrice = formatPrice(currentPrices.Business.crossed);
    const vipCrossedPrice = formatPrice(currentPrices.Vip.crossed);
    const premiumCrossedPrice = formatPrice(currentPrices.Premium.crossed);

    const standartMainPrice = formatPrice(currentPrices.Standart.main);
    const businessMainPrice = formatPrice(currentPrices.Business.main);
    const vipMainPrice = formatPrice(currentPrices.Vip.main);
    const premiumMainPrice = formatPrice(currentPrices.Premium.main);

    document.getElementById('standartCrossedPrice').innerText = standartCrossedPrice;
    document.getElementById('businessCrossedPrice').innerText = businessCrossedPrice;
    document.getElementById('vipCrossedPrice').innerText = vipCrossedPrice;
    document.getElementById('premiumCrossedPrice').innerText = premiumCrossedPrice;

    document.getElementById('standartMainPrice').innerText = standartMainPrice;
    document.getElementById('businessMainPrice').innerText = businessMainPrice;
    document.getElementById('vipMainPrice').innerText = vipMainPrice;
    document.getElementById('premiumMainPrice').innerText = premiumMainPrice;
}

function toggleVideoPlayerVisibility() {
    const now = new Date();
    const day = now.getDay();
    const videoPlayer = document.getElementById('video-player');

    // Удалить видеоплеер, если сегодня вторник (2), четверг (4) или суббота (6)
    if (day === 2 || day === 4 || day === 6) {
        if (videoPlayer) {
            videoPlayer.remove();
        }
    } else {
        if (videoPlayer) {
            videoPlayer.style.display = 'block';
        }
    }
}

window.onload = function() {
    displayPrices();
    toggleVideoPlayerVisibility();
};