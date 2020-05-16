var _ = require('lodash');
var casual = require('casual');
'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('schema.json');
let profile = JSON.parse(rawdata);

userInput = {
    userAddress: '2341 glen way',
    catchAll: '@coolshit.com'

}
//START GENERATION

// Jig address
var address = jigAddress(profile, userInput)
profile.delivery.address1 = address 

// fake person
var person = fakePerson(profile, userInput)

profile.email = person.fakeEmail
profile.delivery.firstName = person.fakeFirst
profile.delivery.lastName = person.fakeLast
profile.phone = person.fakePhone

console.log(profile)




function jigAddress(profile, userInput) {
    var unjigged = userInput.userAddress + '1234'
    return unjigged
    
}

function fakePerson(profile, userInput) {
    var fakeLast = casual.last_name
    var fakeFirst = casual.first_name

    person = {
        fakeFirst : fakeFirst,
        fakeLast : fakeLast,
        fakeEmail : fakeLast + fakeFirst + userInput.catchAll,
        fakePhone : casual.phone
    }
    return person

}







