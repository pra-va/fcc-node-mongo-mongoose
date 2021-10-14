require('dotenv').config();
const { Schema, Model, model } = require('mongoose');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const somePerson = new Person({
    name: "Pranas",
    age: 22,
    favoriteFoods: ["Fish", "Kebab", "Pizza"]
  });
  somePerson.save((err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  const persons = [
    {
      name: "pranas",
      age: 22,
      favoriteFoods: ["some", "food"]
    },
    {
      name: "ruta",
      age: 23,
      favoriteFoods: ["other", "another"]
    }
  ];
  Person.create(arrayOfPeople, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, res) => {
    if (err) console.error(err);
    done(null, res);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, res) => {
    if (err) console.error(err);
    done(null, res);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, res) => {
    if (err) console.error(err);
    done(null, res);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, person) => {
      if (err) console.error(err);
      done(null, person);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err, updatedDocument) => {
      if (err) console.error(err);
      done(null, updatedDocument);
    }
  );
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
