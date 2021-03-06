const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    family_name: {type: String, required: true, maxLength: 100},
    first_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
      return this.family_name + ', ' + this.first_name;
  });

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(() => this.date_of_death.getYear() - this.date_of_birth.getYear().toString());

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(() => '/catalog/author/' + this._id);

module.exports = mongoose.model('Author', AuthorSchema);
