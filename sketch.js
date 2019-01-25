


//Variablen definieren
//Mit Werten gefüllt werden diese in der Funktion gotWeather
let a, b, c, d, e, f, temp_c, wind_kph, precip_mm, cloud, vis_km, sunrise, sunset, min, input, button, time;
let key='916f8b6ae77d4b1d90c92037191101';
let city="zürich";

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);



//Wetter API URL - in FireFox öffnen!
  //https://api.apixu.com/v1/forecast.json?key=916f8b6ae77d4b1d90c92037191101&q=Zürich&days=1

    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+city+'&days=1';


    input = createInput();//https://p5js.org/examples/dom-input-and-button.html
    input.position(50, 15);

    button = createButton('GO!');
    button.position(input.x + input.width +10, 15);
    button.mousePressed(reloadJson);


  //Dokumentation
    // https://www.apixu.com/doc/forecast.aspx
  loadJSON(url, gotWeather);

}



function reloadJson(){

    let city = input.value();

    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+city+'&days=7';

    loadJSON(url, gotWeather);
}

//SPLIT TIME
function timeToMin(time) {
  let min = 0;

  let allSplit = time.split(" ");
  // allSplit = ["08:07", "AM"]


  let timeSplit = allSplit[0].split(":");
  // timeSplit = ["08", "07"]

  min += 60 * parseInt(timeSplit[0]) // add hours
  min += parseInt(timeSplit[1]) // add minutes

  if(allSplit[1] == "PM") {
    min += (12 * 60);
  }

  return min

}

//SPLIT DATE
function dateToMin(time) {
  min = 0;

  let allSplit = time.split(" ");
  // allSplit = ["2019-01-24", "19:33"]


  let timeSplit = allSplit[1].split(":");
  // timeSplit = ["19", "33"]

  min += 60 * parseInt(timeSplit[0]) // add hours
  min += parseInt(timeSplit[1]) // add minutes

}



function draw() {


  var h = hour();
  var hr = map(h, 0, 24, -250, 750)


  background(0, 150, 255);


//MOUNTAIN
fill(a, 255, a);
noStroke();
  triangle(250, 100, 0, 500, 500, 500);

//VIS
fill(230, 230, 230, e)
noStroke();
quad(0, 0, 500, 0, 500, 500, 0, 500);

//SUN
fill(255, 255, 200);
noStroke();
  ellipse(f, 0, 100, 100);

//RAIN
fill(0, 70, 100, 100);
noStroke();
  triangle(0-c, 250-c, 0+c, 250-c, 0, 250+c);
  triangle(125-c, 250-c, 125+c, 250-c, 125, 250+c);
  triangle(250-c, 250-c, 250+c, 250-c, 250, 250+c);
  triangle(375-c, 250-c, 375+c, 250-c, 375, 250+c);
  triangle(500-c, 250-c, 500+c, 250-c, 500, 250+c);

  triangle(62-c, 375-c, 62+c, 375-c, 62, 375+c);
  triangle(188-c, 375-c, 188+c, 375-c, 188, 375+c);
  triangle(307-c, 375-c, 307+c, 375-c, 307, 375+c);
  triangle(438-c, 375-c, 438+c, 375-c, 438, 375+c);




//CLOUDS
fill(255, 255, 255, 180);
noStroke();
  ellipse(0, 175, d, d);
  ellipse(125, 175, d, d);
  ellipse(250, 175, d, d);
  ellipse(375, 175, d, d);
  ellipse(500, 175, d, d);








}




function gotWeather(weather) {
  temp_c=weather.current.temp_c;
  wind_kph=weather.current.wind_kph;
  precip_mm=weather.current.precip_mm;
  cloud=weather.current.cloud;
  vis_km=weather.current.vis_km;
  sunrise=weather.forecast.forecastday[0].astro.sunrise;
  sunset=weather.forecast.forecastday[0].astro.sunset;

  timeToMin(weather.forecast.forecastday[0].astro.sunrise)
  timeToMin(weather.forecast.forecastday[0].astro.sunset)

  dateToMin(weather.location.localtime);




  //MAP
  a = map(temp_c, -10, 40, 255, 60);
  b = map(wind_kph, 0, 100, 0, 0.1);
  c = map(precip_mm, 0.1, 50, 0, 500);
  d = map(cloud, 0, 100, 0, 255);
  e = map(vis_km, 0.01, 30, 200, 0);
  f = map(min, timeToMin(sunrise), timeToMin(sunset), -50, 550)

  console.log('Temperatur',temp_c);
  console.log('Windgeschwindigkeit',wind_kph);
  console.log('Niederschlag',precip_mm);
  console.log('Wolkendichte',cloud);
  console.log('Sicht',vis_km);
  console.log('Sonnenstand',f);


  console.log('Sonnenaufgang', timeToMin(sunrise), 'Sonnenuntergang', timeToMin(sunset));

  console.log('Minuten', min);



}
