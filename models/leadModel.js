const mongoose = require('mongoose');
const slugify = require('slugify');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Lead must have a name'],
      unique: false,
      trim: true,
      minlength: [5, 'A Lead name must have more or equal then 5 characters']
    },
    address: {
      type: String,
      required: [true, 'A Lead must have a address'],
      minlength: [5, 'A Lead address must have more or equal then 5 characters']
    },
    isClient: {
        type: Boolean,
        default: false
    },
    lat: {
      type: Number,
      required: [true, 'A Lead must have a latitude']
    },
    lng: {
        type: Number,
        required: [true, 'A Lead must have a longitude']
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

leadSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

leadSchema.pre(/^find/, function(next) {
  this.find({ secretLead: { $ne: true } });

  this.start = Date.now();
  next();
});

leadSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});


const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;