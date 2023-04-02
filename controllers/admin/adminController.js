const categoryModel = require("../../model/categoryModel");
const companyModel = require("../../model/companyModel");
const jobModel = require("../../model/jobModel");
const userModel = require("../../model/userModel");
const sendEmail = require("../../services/sendEmail");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;
  // find category by name

  const exists = await categoryModel.find({
    name,
  });
  if (exists.length > 0)
    return res.json({
      status: 400,
      message: "Category already exists",
    });

  try {
    const category = await categoryModel.create({
      name,
      userId,
    });
    res.json({
      status: 200,
      message: "Created category sucessfully",
      category,
    });
  } catch (e) {
    res.json({
      status: 400,
      message: "Error in creating category",
      error: e,
    });
  }
};

exports.getCategory = async (req, res) => {
  const catgory = await categoryModel.find();
  res.json({
    status: 200,
    message: "Category fetched successfully",
    catgory,
  });
};

exports.getCompanies = async (req, res) => {
  const companies = await companyModel.find();
  console.log(companies);
  res.json({
    status: 200,
    message: "Companies fetched successfully",
    companies,
  });
};

exports.deleteCompany = async (req, res) => {
  console.log(req.params.id);
  const company = await companyModel.findByIdAndDelete(req.params.id);
  res.json({
    status: 200,
    message: "Company deleted successfully",
    company,
  });
};

exports.getJobs = async (req, res) => {
  const jobs = await jobModel.find().populate("userId");
  res.json({
    status: 200,
    message: "Jobs fetched successfully",
    jobs,
  });
};

exports.deleteCategory = async (req, res) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  res.json({
    status: 200,
    message: "Category deleted successfully",
    category,
  });
};

exports.massNotification = async (req, res) => {
  const { message } = req.body;
  const users = await  userModel.find();
  users.forEach(async (user) => {
    await sendEmail({
      email: user.email,
      subject: "Job Portal Notification",
      text: message,
    });
  });
  res.json({
    status: 200,
    message: "Notification sent successfully",
  });
};
