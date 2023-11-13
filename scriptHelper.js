// Write your helper functions here!

require('cross-fetch/polyfill');



function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    
    document.getElementById("missionTarget").innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src= "${imageUrl}">
    `;
}; 

function validateInput(testInput) {
    
    if (testInput == "") {
       return "Empty";
    } else if (isNaN(parseInt(testInput))) { 
        return "Not a Number";
    } else if (!isNaN(parseInt(testInput))) { 
        return "Is a Number";
    } else {
        return "Invalid Input. Please try again.";
    } 
 }; 

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
 
    let pilotValidation = validateInput(pilot);
    let copilotValidation = validateInput(copilot);
    let fuelLevelValidation = validateInput(fuelLevel);
    let cargoMassValidation = validateInput(cargoLevel);

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    
    if (pilotValidation === "Empty") {
        window.alert("Pilot name required! Please try again."); 
    } else if (pilotValidation === "Is a Number" ) {
        window.alert("Pilot name cannot be a number! Please try again."); 
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    }

    if (copilotValidation === "Empty") {
        window.alert("Copilot name required! Please try again."); 
    } else if (copilotValidation === "Is a Number" ) {
        window.alert("Copilot name cannot be a number! Please try again."); 
    } else {
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    if (fuelLevelValidation === "Empty") {
        window.alert("Fuel level required! Please try again."); 
    } else if (fuelLevelValidation === "Not a Number") {
        window.alert("Fuel level must be a number! Please try again."); 
    } else if (fuelLevelValidation === "Is a Number") {
        if (Number(fuelLevel) < 10000 ) {
            fuelStatus.innerHTML = "Fuel level low! Minimum fuel required: 10,001 liters.";
            launchStatus.innerHTML = "Shuttle not ready for launch. Please inspect fuel tank.";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
        } 
    } else {
        fuelStatus.innerHTML = "Fuel level sufficient for launch!"
    }

    if (cargoMassValidation === "Empty") {
        window.alert("Cargo mass required! Please try again.");
    } else if (cargoMassValidation === "Not a Number") {
        window.alert("Cargo mass must be a number! Please try again.");
    } else if (cargoMassValidation === "Is a Number") {
        if (Number(cargoLevel) > 10000 ) {
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
        }
    } else {
        cargoStatus.innerHTML = "Cargo mass sufficient for launch!"
    }

    if (parseInt(fuelLevel) > 10000 && parseInt(cargoLevel) < 10000) {
        launchStatus.innerHTML = "Shuttle ready for launch!";
        launchStatus.style.color = "green";
    }
}; 

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    }); 

    return planetsReturned;
}; 

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    let selectedPlanet = planets[planetIndex];
    return selectedPlanet;
}; 

 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;