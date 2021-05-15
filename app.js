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
      // TODO: get person's info
      getPersonInfo(person);
    break;
    case "family":
      getPersonFamily(person);
    break;
    case "descendants":
    // TODO: get person's descendants
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
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

// function that alerts found person's info
function getPersonInfo(person){
  let displayInfo = "";// i created an empty string
  for (let i in person){ // used a for... in loop to grab keys in person array
    displayInfo += `${i} : ${person[i]}\n`;// since i is the key of person, then personi grabs the value. I could have use the "entries" methode to grab both as well.
  }
  alert(displayInfo);//shows results of display info
}

//function that alerts person's family
function getPersonFamily(person){

  let actualPerson = person;

  function findPeopleWithMatchingLastName(person){
    let foundPersonFamily = data.filter(function(person){
      if(person.lastName.toLowerCase() === actualPerson.lastName.toLowerCase()){
        return true;
      }
      else{
        return false;
      }
    })
    return foundPersonFamily;
  }


  let personFamilyArray = findPeopleWithMatchingLastName(person);


  let displayFamily = "";// i created an empty string
  for (let i in personFamilyArray){ // used a for...in loop to grab keys in personFamilyArray 
  displayFamily += `Person Name: ${personFamilyArray[i].firstName} ${personFamilyArray[i].lastName}\n`;// since i is the key of person, then personi grabs the value. I could have use the "entries" methode to grab both as well.
  }

  alert(displayFamily);//results of display info  MAY WANT TO INNERHTML THIS INFO

}