var _ = require('lodash');
var casual = require('casual');
'use strict';

const fs = require('fs');


String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};


userInput = {
    groupName: 'TestVCCs',
    gmail:'diegozertuche2@gmail.com',
    catchAll: '@sneakerknockerzsnk.com',
    residentialAddress: true,
    userAddress: '401 E Ravine Baye road',
    city: 'Bayside',
    zip: '53217',
    country: 'United States',
    state: 'Wisconsin',
    profileNumber: 50
}
//START GENERATION
var profileGroup = Array.apply(null, Array(userInput.profileNumber)).map(function () {})

for(var i = 0; i < userInput.profileNumber; i++)
{
    let rawdata = fs.readFileSync('schema.json');
    let profile = JSON.parse(rawdata);
    profile.name = userInput.groupName + " " + i
    profileGroup[i] = new createCyberProfile(profile, userInput)
    //gmaildotrick(profile, userInput)
}



console.log(profileGroup)

function createCyberProfile(profile, userInput){
    //Base input (Same for every profile)
    
    profile.delivery.city = userInput.city
    profile.delivery.zip = userInput.zip
    profile.delivery.country = userInput.country
    profile.delivery.state = userInput.state

    profile.billing.city = userInput.city
    profile.billing.zip = userInput.zip
    profile.billing.country = userInput.country
    profile.billing.state = userInput.state

    // front Jig address
    var LetterjiggedAddress = frontletterJigg(profile, userInput)
    profile.delivery.address1 = LetterjiggedAddress
    profile.billing.address1 = LetterjiggedAddress
    
    //ending jigg addresss
    var LetterjiggedAddress = endletterJigg(profile, userInput)
    profile.delivery.address1 = LetterjiggedAddress
    profile.billing.address1 = LetterjiggedAddress

    //apartment in address2 jigg
    var address2jigged = apartmentJiggAddress(profile, userInput)
    profile.delivery.address2 = address2jigged
    profile.billing.address2 = address2jigged

    // fake person billing/shipping
    var person = fakePerson(profile, userInput)
    profile.email = person.fakeEmail
    profile.delivery.firstName = person.fakeFirst
    profile.delivery.lastName = person.fakeLast
    profile.phone = person.fakePhone
    profile.billing.firstName = person.fakeFirst
    profile.billing.lastName = person.fakeLast

    return profile
}

//gmail dot trick function
function gmaildotrick(profile, userInput){
    var ogmail = userInput.gmail
    cutgmail = ogmail.replace('@gmail.com', '')
    len = cutgmail.length
    randnum1 = casual.integer(from = 1, to = len -1)
    randnum2 = casual.integer(from = 1, to = len -1)


    for(var k = 0; k <= randnum1; k++)
    {
        dottedgmail = cutgmail.splice(randnum2, 0, ".")
    }
    
    profile.email = dottedgmail + "@gmail.com"
}

//Address Jigg functions
function frontletterJigg(profile, userInput) {
    var unjigged = userInput.userAddress
    var jiggedLetters = casual.letter + casual.letter + casual.letter + casual.letter
    return jiggedLetters.toUpperCase() + ' ' + unjigged
    
}

function endletterJigg(profile, userInput) {
    var unjigged = userInput.userAddress
    var jiggedLetters = casual.letter + casual.letter + casual.letter + casual.letter
    return  unjigged + ' ' + jiggedLetters.toUpperCase()
    
}

function apartmentJiggAddress(profile, userInput){
    var jiggedLine2 = casual.integer(from = 1, to = userInput.profileNumber * 2)
    randomAbrev = casual.integer(from = 1, to = 3)
    if (randomAbrev == 1) {
        jiggedLine2 = 'APT ' + jiggedLine2
    } else {
        if (randomAbrev == 2) {
            jiggedLine2 = 'Apt. ' + jiggedLine2
        }
        else{
            if (randomAbrev == 3) {
                jiggedLine2 = '#' + jiggedLine2
            } 
        }
    }
    return jiggedLine2
}


//fake info generator
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






