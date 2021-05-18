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
  //findPersonByNameInput(firstName,lastName); FOR SOME REASON PEOPLE IS NOT DEFINED IN FUNCTION
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
  //Jasmine Bob is not related to Billy Bob?!?!
  //She has 2 male parents


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
  let selectedTrait = promptFor("What trait(s) would you like to search by? Choose gender, eye color, dob, height, weight, occupation, parents, current Spouse", chars);
  
  switch(selectedTrait){
    case "gender":
      displayGenderList(people);
      break;
    case "eye color":
      displayEyeColor(people);
      break;
    case "dob":
      displayDateOfBirth(people);
      break;
    case "height": 
      displayHeight(people);
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

function displayGenderList(people) {
  let userInputGender = promptFor("What gender is the person?", maleFemale);

  let genderArray = people.filter(function(person){
  if(person.gender.toLowerCase() === userInputGender.toLowerCase()){return true;}
  else {return false;}})
  placeItemsInStringAlert(genderArray);
  return genderArray; 
}

//helper function to place family members into a string and alert
function placeItemsInStringAlert(array) {
  let displayString = "";
  for (let i in array){ // used a for...in loop to grab keys in personFamilyArray 
    displayString += `${i}: ${array[i].firstName} ${array[i].lastName}\n`;  
  }
  let userInput = prompt(displayString);
  let userInputArray = [userInput];
  console.log(userInputArray);
}

function displayEyeColor(people){
  let userInputEyeColor = prompt("What color eyes does the person have?");
  let eyeColorArray = people.filter(function(person){
    if(person.eyeColor.toLowerCase() === userInputEyeColor.toLowerCase()){return true;}
    else {return false;}})
    placeItemsInStringAlert(eyeColorArray);
    return eyeColorArray;
}

function displayDateOfBirth(people){
  let userInputDateOfBirth = prompt("Date of birith? m/d/yyyy");
  let dateOfBirthArray = people.filter(function(person){
    if(person.dob.toLowerCase() === userInputDateOfBirth.toLowerCase()){return true;}
    else {return false;}})
    placeItemsInStringAlert(dateOfBirthArray);
    return dateOfBirthArray;
} 
    
function displayHeight(people){
  let userInputHeight = prompt("What is the persons height in inches?");
  let b = parseInt(userInputHeight)
  let heightArray = people.filter(function(person){
    if(person.height === b){return true;}
    else {return false;}})
    placeItemsInStringAlert(heightArray);
    console.log(heightArray);
    return heightArray;
} 
//This function did not return any array since height is an integer.