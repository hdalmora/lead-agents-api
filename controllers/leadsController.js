const Lead = require('./../models/leadModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllLeads = async (req, res) => {
  try {
    const features = new APIFeatures(Lead.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const leads = await features.query;

    res.status(200).json({
      status: 'success',
      results: leads.length,
      leads
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      lead
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createLead = async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);

    res.status(201).json({
      status: 'success',
      newLead
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      lead
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};