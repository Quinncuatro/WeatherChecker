  var owmlat;
  var owmlng;
  var city;
  var temp;
  var tempC;
  var whatever;
  var currentCondition;

  $(document).ready(function() {
        // Get geo data and set variables
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            owmlat = position.coords.latitude;
            owmlng = position.coords.longitude;
            $(".whatever").html("latitude: " + owmlat + "<br>longitude: " + owmlng);
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + owmlat + "&lon=" + owmlng + "&units=imperial&appid=b1b15e88fa797225412429c1c50c122a").then(function(result) {
              city = result.name;
              temp = result.main.temp;
              tempC = ((temp - 32) * (5 / 9)).toFixed(2);
              currentCondition = result.weather[0].main.toLowerCase();
            });
          });
        }

        // Type out strings on screen
        $(".element").typed({
            strings: ["Computer, what's the weather like right now?"],
            typeSpeed: 10,
            backDelay: 2500,
            loop: false,
          }).delay(4000).queue(function(next) {
              $(".response").typed({
                strings: ["CPU: Give me a moment to look that up for you."],
                typeSpeed: 0,
                loop: false,
              }).delay(4000).queue(function(next) {
                  $(".response2").typed({
                    strings: ["CPU: It looks like you're in " + city + " right now.<br> It's <span class='newTemp'>" + temp + " &deg;F</span> and it looks like " + currentCondition + ".<br> What unit would you like that in? <span class='F link' onClick='tempInF()'>F</span> / <span class='C link' onClick='tempInC()'>C</span>"],
                    typeSpeed: 0,
                    loop: false,
                  }).delay(6000).queue(function(next) {
                      var city = currentCondition;
                      switch (city) {
                        case 'dizzle':
                          addIcon(city)
                          break;
                        case 'clouds':
                          addIcon(city)
                          break;
                        case 'rain':
                          addIcon(city)
                          break;
                        case 'snow':
                          addIcon(city)
                          break;
                        case 'clear':
                          addIcon(city)
                          break;
                        case 'thunderstom':
                          addIcon(city)
                          break;
                        default:
                          $('div.clouds').fadeIn("slow").removeClass('hide');
                      }
                      function addIcon(city) {
                        $('div.' + city).fadeIn("slow").removeClass('hide');
                      }
                  });
              });
        });
  });
            function tempInF() {
              $(".newTemp").html(temp + " &deg;F")
            }

            function tempInC() {
              $(".newTemp").html(tempC + " &deg;C")
            }