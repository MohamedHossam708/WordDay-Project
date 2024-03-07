import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middeleware.js";
import { isAuthorized } from "../../middleware/authoriztion.middelware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { createCompany, deleteCompany, findByName, getCompanyData, getallTheApplications, updateCompant } from "./Company.controller.js";
import {  allapplications, createCompanyVal, deleteCompanyVal, findByNameVal, updatecompanyVal } from "./Company.valid.js";

const router= Router()

// creating company after making suer that the user role in admin (isAuthorized("Company_HR"))
router.post('/CreateCompany',isAuthenticated,isAuthorized("Company_HR"),validation(createCompanyVal),createCompany)
//// updating company after making suer that the user role in admin (isAuthorized("Company_HR"))
router.patch("/updateCompant/:id",isAuthenticated,isAuthorized("Company_HR"),validation(updatecompanyVal),updateCompant)
// deleteing company data
router.delete("/deleteCompany/:id",isAuthenticated,isAuthorized("Company_HR"),validation(deleteCompanyVal),deleteCompany)
// get data company
router.get("/companyData/:id",isAuthenticated,isAuthorized("Company_HR"),validation(deleteCompanyVal),getCompanyData)

router.post("/findByName",isAuthenticated,isAuthorized("Company_HR", "User"),validation(findByNameVal),findByName)


// Get all applications for specific Jobs
router.get("/getallTheApplications/:id",isAuthenticated,isAuthorized("Company_HR"),validation(allapplications),getallTheApplications)
export default router