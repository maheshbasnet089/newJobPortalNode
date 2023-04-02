const {
  createAppliedJob,
  getApplicants,
} = require("../controllers/job/appliedJobController");
const { isAuthenticated } = require("../services/isAuthenticated");

const router = require("express").Router();
const { multer, storage } = require("./../services/multerConfig");
const upload = multer({ storage: storage });

router
  .route("/")
  .post(isAuthenticated, upload.single("image"), createAppliedJob);

router.route("/applicants").get(isAuthenticated, getApplicants);
module.exports = router;
