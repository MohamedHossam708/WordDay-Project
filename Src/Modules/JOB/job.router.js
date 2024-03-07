import  Router  from "express";
import { isAuthenticated } from "../../middleware/authentication.middeleware.js";
import { isAuthorized } from "../../middleware/authoriztion.middelware.js";
import { validation } from "../../middleware/validation.middleware.js";
import {  applyval, createjobVal, deleteJobVal, getFilterdJobsVal, getOneCompanyVal, updatejobVal } from "./job.validitaoin.js";
import { applyToJob, createJob, deleteJob, getAllJobs, getFilterdJob, getOneCompany, updateJob } from "./job.controller.js";
import { fileUpload } from "../../utlis/fileUpload.js";

const router= Router()


//createing a new job 
router.post("/createJob/:id",isAuthenticated,isAuthorized("Company_HR"),validation(createjobVal),createJob)


// updated the job 
router.patch("/updateJob/:id",isAuthenticated,isAuthorized("Company_HR"),validation(updatejobVal),updateJob)


// delete the job and removing it from the array in companies
router.delete("/deleteJob/:id",isAuthenticated,isAuthorized("Company_HR"),validation(deleteJobVal),deleteJob)

// get all the jobs with the companies
router.get("/getJobs",isAuthenticated,isAuthorized("Company_HR", "User"),getAllJobs)
// get the job with company name
router.get("/getOneJob",isAuthenticated,isAuthorized("Company_HR", "User"),validation(getOneCompanyVal),getOneCompany)
// get filterd job
router.get("/FilterJob",isAuthenticated,isAuthorized("Company_HR", "User"),validation(getFilterdJobsVal),getFilterdJob)

//apply to job
router.post("/applyToJob/:jobId",isAuthenticated,isAuthorized("Company_HR", "User"),fileUpload().single("cv"),validation(applyval),applyToJob)
export default router