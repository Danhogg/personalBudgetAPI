# personalBudgetAPI
## Main idea
This is a basic API that implements the ability to create a personal budget using the envelope budget method. It is an off site project from Codecademy designed
to be done locally. The port used in this project is 3000 so all requests will be prefixed by 'localhost:3000'.
## Express methods used
- GET
- POST
- PUT
- DELETE

### GET
- [x] '/' returns a string telling the user about what can be done in this project.
- [x] '/envelopesall' returns all envelopes that have been posted into the envelopes array.
- [x] '/envelopes/:id' returns the envelope with the specified id if the id relates to an envelope object and returns a 400 error otherwise.

### POST
- [x] '/envelopes' will validate a new envelope that is submitted checking the title and budget parameters ensuring the title is a string and budget is a number
then will add any valid envelope to the envelopes array with an id.
- [] '/envelopes/transfer/:from/:to' transfers a specific amount from one envelope to another if you want to increase the budget from one envelope by taking it from another 

### PUT
- [x] '/envelopes/:id' will update the requested envelope if the user uses an envelope of the valid format 

### DELETE
- [x] '/envelopes/:id' deletes the specified envelope from the array

#### Extra info
Envelopes passed into the POST for adding to the envelopes array should be JSON files of the form {"title": "string", "budget": number} or vice versa. 
Other parameters can be added but title and budget are required. The final POST method remains to be added and if it were to be used seriously and not 
built for practice by myself a method for actually writing this data to files to access this data after closing and reopening the server could be added. 
It would also be useful to extend the post method for creating envelopes so x-www-form-urlencoded can be used instead of having to send a JSON.
