const express = require('express');
const router = express.Router();
const employeesCon = require('../../controllers/employeesCon');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(employeesCon.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesCon.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesCon.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesCon.deleteEmployee);

router.route('/:id').get(employeesCon.getEmployee);

module.exports = router;
