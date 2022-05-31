/* Client side javascript */
console.log('Scripts.js loaded!');

getDinoName();

async function getDinoName() {
    const response = await fetch('/dinoname'); //fetch data
    const data = await response.json(); //formate as json data
    console.log(data);
}