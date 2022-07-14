const express = require("express"); //nie korzystam już z http!!
const port = 3000;
const app = express();
//ustawienie, ze moja aplikacja musi korzystac z silnika hbs
app.set("view engine", 'hbs')
//gdy uzytkownik wchodzi na stronę główną
app.get('/', function (req, res) {
    res.render('index');
})
//gdy uzytkownik wchodzi na stronę rezerwacji Mazur
app.get('/reservationM', function (req, res){
    res.render('reservationM');
})
//gdy uzytkownik wchodzi na stronę rezerwacji Kanary
app.get('/reservationK', function (req, res){
    res.render('reservationK');
})
//gdy uzytkownik wchodzi na stronę rezerwacji Lofoty
app.get('/reservationL', function (req, res){
    res.render('reservationL');
})

app.listen(port, (err) => {
    if (err) {
    return console.log("coś poszło nie tak...:", err)
}
console.log("serwer działa na porcie", port)
})
// Podpięcie css
const path = require('path')
app.use('/assets', express.static(path.join(__dirname, "./assets")));
// podpiecie js
app.use('/js', express.static(path.join(__dirname, "./js")));
// podpiecie data?
app.use('/data', express.static(path.join(__dirname, './data'))); 

