const assert = require("assert");
const UserController = require("../user.controller");

describe("User Controller", function() {
  describe("#getProfile()", async function() {
    it("should error when no data is present in the db", async function() {
      return UserController.getProfile().catch(err => {
        assert.equal(err.message, "No User Found!");
      });
    });
  });
  describe("#forgotPassword()", async function() {
    it("should not send forgot password email if email is empty", function() {
      return UserController.forgotPassword({}).catch(err => {
        assert.equal(err.message, "Please enter the email address");
      });
    });
  });
});
