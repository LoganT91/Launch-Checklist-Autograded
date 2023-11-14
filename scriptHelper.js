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
    
    if (testInput === "") {
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
    
    if (pilotValidation === "Empty" || copilotValidation === "Empty") {
        window.alert("Names required! Please try again."); 
    } else if (pilotValidation === "Is a Number" || copilotValidation === "Is a Number") {
        window.alert("Pilot and Co-Pilot name cannot be a number! Please try again."); 
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }
    /*
    if (copilotValidation === "Empty") {
        window.alert("Copilot name required! Please try again."); 
    } else if (copilotValidation === "Is a Number" ) {
        window.alert("Copilot name cannot be a number! Please try again."); 
    } else {
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }
*/
    if (fuelLevelValidation === "Empty" || cargoMassValidation === "Empty") {
        window.alert("Input required. Please try again."); 
    } else if (fuelLevelValidation === "Not a Number" || cargoMassValidation === "Not a Number") {
        window.alert("Invalid input. Please try again."); 
    } else if (fuelLevelValidation === "Is a Number") {
        if (Number(fuelLevel) < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
        }  else {
        fuelStatus.innerHTML = "Fuel level high enough for launch"
    }
    if (Number(cargoLevel) > 10000 ) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
        faultyItems.style.visibility = "visible";
    } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch"
    };
};
/*
*/
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    };
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