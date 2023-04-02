const appliedJobModel = require("../../model/appliedJobModel");

exports.createAppliedJob = async (req, res) => {
  const { jobId, experience } = req.body;
  const companyId = req.body.companyId || 1;
  const userId = req.userId;
  const imagePath = req.file.filename;
  console.log(req.file);

  try {
    const appliedJob = await appliedJobModel.create({
      userId,
      companyId,
      jobId,

      experience,
      cv: `${process.env.BASE_URL}` + imagePath,
    });
    res.status(200).json({
      status: "success",
      appliedJob,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getAppliedJobs = async (req, res) => {
  try {
    const appliedJobs = await appliedJobModel.find({ userId: req.userId });
    res.status(200).json({
      status: "success",
      appliedJobs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getAppliedJob = async (req, res) => {
  try {
    const appliedJob = await appliedJobModel
      .findById(req.params.id)
      .populate("userId");
    res.status(200).json({
      status: "success",
      appliedJob,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const applicants = await appliedJobModel
      .find({ companyId: req.userId })
      .populate("userId");
    console.log(applicants);
    res.status(200).json({
      status: "success",
      applicants,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.approveApplicant = async (req, res) => {
  try {
    const applicant = await appliedJobModel.findById(req.params.id);
    applicant.status = "approved";
    await applicant.save();
    res.status(200).json({
      status: "success",
      applicant,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
