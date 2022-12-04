const SampleData = require('../models/sampleDataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllData = catchAsync(async (req, res, next) => {
  const data = await SampleData.find();
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: data.length,
    data: {
      data: data,
    },
  });
});

exports.getData = catchAsync(async (req, res, next) => {
  const data = await SampleData.findById(req.params.id);

  if (!data) {
    return next(new AppError('No data found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.createData = catchAsync(async (req, res, next) => {
  const newData = await SampleData.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newData,
    },
  });
});

exports.updateData = catchAsync(async (req, res, next) => {
  const data = await SampleData.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return next(new AppError('No data found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: data,
    },
  });
});

exports.deleteData = catchAsync(async (req, res, next) => {
  const data = await SampleData.findByIdAndDelete(req.params.id);

  if (!data) {
    return next(new AppError('No data found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
