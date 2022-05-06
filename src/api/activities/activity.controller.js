const Activity = require("./activity.model");


const getAll = async (req, res, next) => {
  
  try {
    console.log('INFO-API: (activity.controller - getAll)');
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
  return next(
    setError(error.statusCode, "An error occured getting all activities")
  );
  }
};

const getOne = async (req, res, next) => {
  try {
    console.log('INFO-API: (activity.controller - getOne)');
    const { _id } = req.params;
    const activity = await Activity.findById(_id);
    res.status(200).json(activity);
  } catch (error) {
    return next(
      setError(error.statusCode, "An error occured getting the activity")
    );
  }
};


const getAllByType = async (req, res, next) => {
  
  try {
    console.log('INFO-API: (activity.controller - getAllByType)');
    const { type } = req.params;
    const activities = await Activity.find({ type: type });

    res.status(200).json(activities);
  } catch (error) {
    return next(
      setError(error.statusCode, "An error occured getting activities by type")
    );
  }
};

const postOne = async (req, res, next) => {
  try {
    console.log('INFO-API: (activity.controller - postOne) - req.body: ', req.body);
    const activity = new Activity();
    activity.id = req.body.id;
    activity.level = req.body.level;
    activity.type = req.body.type;
    activity.questions = req.body.questions;
    const activityDB = await activity.save();
    return res.status(201).json(activityDB);
  } catch (error) {
    return next(
      setError(error.statusCode, "An error occured creating an activity")
    );
  }
};

const deleteOne = async (req, res, next) => {
  try {
    console.log('INFO-API: (activity.controller - deleteOne)');
    const { _id } = req.params;
    const Activity = await Activity.findByIdAndDelete(_id);
    return res.status(200).json(Activity);
  } catch (error) {
    return next(setError(error.statusCode, "An error occured deleting an activity"));
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
  deleteOne,
  getAllByType,
  
};
