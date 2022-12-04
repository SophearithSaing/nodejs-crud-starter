const mongoose = require('mongoose');

const sampleDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field is required'],
      unique: true,
    },
    stringWithOption: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'String must be easy, medium or difficult',
      },
    },
    numberField: {
      type: Number,
      required: [true, 'Price field is required'],
    },
    numberFieldWithRange: {
      type: Number,
      default: 4.5,
      min: [1, 'Number must be at least 1'],
      max: [5, 'Number must not be more than 5'],
    },
    numberDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.numberField;
        },
        message: 'Discount number ({VALUE}) should be below regular number',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SampleData = mongoose.model('SampleData', sampleDataSchema);

module.exports = SampleData;
