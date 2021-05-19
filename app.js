"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchByTraits(people);

      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt(`Found ${person.firstName} ${person.lastName}. Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit`);

  switch(displayOption){
    case "info":
      displayInfo(person);
    break;
    case "family":
      displayFamily(person);
    break;
    case "descendants":
      displayDescendants(person);

    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

// Add in validation for user prompt!
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){return true;}
    else {return false;}})
  return foundPerson[0];
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass into promptFor to validate yes/no answers
function maleFemale(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

// function that alerts found person's info
function displayInfo(person){
  let displayInfoString = "";
  for (let i in person){displayInfoString += `${i} : ${person[i]}\n`;}
  
  alert(displayInfoString);
}

//function that alerts person's family
function displayFamily(person){

  findPeopleWithMatchingLastNameOrSpouseId(person);


  let personFamilyArray = findPeopleWithMatchingLastNameOrSpouseId(person);


  placeFamilyMembersIntoStringAndAlert(personFamilyArray);
}

//helper function to match people with same last name
function findPeopleWithMatchingLastNameOrSpouseId(person){
  let actualPerson = person;
  let foundPersonFamily = data.filter(function(person){
    if(person.lastName.toLowerCase() === actualPerson.lastName.toLowerCase()){return true;} 
    else if(person.currentSpouse === actualPerson.id){return true;}
    else {return false;}}) 
  return foundPersonFamily;
}

//helper function to place family members into a string and alert
function placeFamilyMembersIntoStringAndAlert(personFamilyArray) {
  let displayFamilyString = "";
  for (let i in personFamilyArray){ // used a for...in loop to grab keys in personFamilyArray 
    displayFamilyString += `Person Name: ${personFamilyArray[i].firstName} ${personFamilyArray[i].lastName}\n`;  
  }
  alert(displayFamilyString);
}

//helper function to find Person by Name Input, but people is not defined inside function.
/* function findPersonByNameInput(firstName, lastName) {



  let foundPerson = data.filter(function(person){
  if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){return true;}
  else {return false;}})
  return foundPerson[0]; 
} */


function displayDescendants(person){
  let actualPerson = person;
  let descendantsArray = data.filter(function(person){
  if(person.parents[0] === actualPerson.id || person.parents[1] === actualPerson.id ){return true;}
  else {return false;}}) 
  
  let displayDescendantString = "";
  for (let i in descendantsArray){
    displayDescendantString += `Person Name: ${descendantsArray[i].firstName} ${descendantsArray[i].lastName}\n `;
  }
  alert(displayDescendantString);
}

function searchByTraits(people) {
  let selectedTrait = promptFor("What trait(s) would you like to search by? Choose gender, eye color, dob, height, weight, occupation, parents, current spouse, id", chars);
  
  switch(selectedTrait){
    case "gender":
      let genderListResult = displayGenderList(people);
      displayInfo(genderListResult);
      break;
    case "id":
        let idListResult = displayIdList(people);
        displayInfo(idListResult);
        break;
    case "eye color":
      let eyeColorResult = displayEyeColor(people);
      displayInfo(eyeColorResult);
      break;
    case "dob":
      let dateOfBirthResult = displayDateOfBirth(people);
      displayInfo(dateOfBirthResult);
      break;
    case "height": 
      let heightResult = displayHeight(people);
      displayInfo(heightResult);
      break;
    case "weight": 
     let weightResult = displayWeight(people);
     displayInfo(weightResult);
      break;
    case "occupation": 
      let occupationResult = displayOccupation(people);
      displayInfo(occupationResult);
      break;
    case "current spouse": 
      let spouseResult = findMatchingSpouse(people)
      displayInfo(spouseResult);
      break;
    case "parents":
      let parentResult = findMatchingParent(people);
      displayInfo(parentResult);  
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function displayGenderList(people) {
  let userInputGender = promptFor("What gender is the person?", maleFemale);

  let genderArray = people.filter(function(person){
  if(person.gender.toLowerCase() === userInputGender.toLowerCase()){return true;}
  else {return false;}})
  let userInput = parseInt(prompt(placeItemsInStringAlert(genderArray)));


  return genderArray[userInput]; 
}

//helper function to place family members into a string and alert
function placeItemsInStringAlert(array) {
  let displayString = "Choose the corresponding number\n";
  for (let i in array){ // used a for...in loop to grab keys in personFamilyArray 
    displayString += ` ${i}: ${array[i].firstName} ${array[i].lastName}\n`;  
  }
  return (displayString);
}

function  userInputToPersonName (p){
  let userIndex = [parseInt(userInput)];
  alert(array[userIndex]);
  return array[userIndex];
}

function displayEyeColor(people){
  let userInputEyeColor = prompt("What color eyes does the person have?");
  let eyeColorArray = people.filter(function(person){
    if(person.eyeColor.toLowerCase() === userInputEyeColor.toLowerCase()){return true;}
    else {return false;}})
    let userInput = parseInt(prompt(placeItemsInStringAlert(eyeColorArray)));
    return eyeColorArray[userInput];
}

function displayDateOfBirth(people){
  let userInputDateOfBirth = prompt("Date of birith? m/d/yyyy");
  let dateOfBirthArray = people.filter(function(person){
    if(person.dob.toLowerCase() === userInputDateOfBirth.toLowerCase()){return true;}
    else {return false;}})
    let userInput = parseInt(prompt(placeItemsInStringAlert(dateOfBirthArray)));
    return dateOfBirthArray[userInput];
} 
    
function displayHeight(people){
  let userInputHeight = prompt("What is the persons height in inches?");
  let b = parseInt(userInputHeight)
  let heightArray = people.filter(function(person){
    if(person.height === b){return true;}
    else {return false;}})
    let userInput = parseInt(prompt(placeItemsInStringAlert(heightArray)));
    return heightArray[userInput];
} 

function displayWeight(people){
  let userInputWeight = prompt("What is the persons weight in pounds?");
  let b = parseInt(userInputWeight)
  let weightArray = people.filter(function(person){
    if(person.weight === b){return true;}
    else {return false;}})
    let userInput = parseInt(prompt(placeItemsInStringAlert(weightArray)));
    return weightArray[userInput];
  }

  function displayIdList(people){
    let userInputId = prompt("What is the persons id number");
    let b = parseInt(userInputId)
    let idArray = people.filter(function(person){
      if(person.id === b){return true;}
      else {return false;}})
      let userInput = parseInt(prompt(placeItemsInStringAlert(idArray)));
      return idArray[userInput];
    }

  function displayOccupation(people){
    let userInputOccupation = prompt("What occupation does the person have?");
    let occupationArray = people.filter(function(person){
      if(person.occupation.toLowerCase() === userInputOccupation.toLowerCase()){return true;}
      else {return false;}})
      let userInput = parseInt(prompt(placeItemsInStringAlert(occupationArray)));
      return occupationArray[userInput];
  }



  function enterCurrentSpouse(people){
    
    let userInputCurrentSpouse = prompt("What is the person's spouse first name?");
    let currentSpouseArray = people.filter(function(person){
    if(person.firstName.toLowerCase() === userInputCurrentSpouse.toLowerCase()){return true;}
    else {return false;}})
    return currentSpouseArray[0].id;
  }

  function findMatchingSpouse(people){ 
    let spouseId = enterCurrentSpouse(people);
    let actualPerson = people.filter(function(person){
      if(person.currentSpouse === spouseId){return true;}
      else {return false;}})
      let userInput = parseInt(prompt(placeItemsInStringAlert(actualPerson)));
      return actualPerson[userInput];
  }

  function enterParentName(people){
    let userInputParent = prompt("What is the person's parent's name?");
    let parentNameArray = people.filter(function(person){
      if(person.firstName.toLowerCase() === userInputParent.toLowerCase()){return true;}
      else {return false;}})
      return parentNameArray[0].id;
  }
  
  function findMatchingParent(people){
    let parentId = enterParentName(people);
    let actualPerson = people.filter(function(person){
      if(person.parents === parentId){return true;}
      else {return false;}})
      let userInput = parseInt(prompt(placeItemsInStringAlert(actualPerson)));
      return actualPerson[userInput];
  }