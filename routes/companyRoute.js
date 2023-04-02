const { getCategory } = require("../controllers/admin/adminController");
const { registerCompany } = require("../controllers/auth/authController");
const { getMessages } = require("../controllers/chatController/chatController");
const {
  getProfile,
  editProfile,
  follow,
  unFollow,
  getCompanyMessages,
} = require("../controllers/company/companyController");
const { isAuthenticated } = require("../services/isAuthenticated");

const router = require("express").Router();

router.route("/register").post(registerCompany);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/profile/edit").patch(isAuthenticated, editProfile);
router.route("/follow").post(isAuthenticated, follow);
router.route("/unFollow").post(isAuthenticated, unFollow);
router.route("/messages").get(isAuthenticated, getCompanyMessages);
router.route("/category").get(getCategory)
module.exports = router;
