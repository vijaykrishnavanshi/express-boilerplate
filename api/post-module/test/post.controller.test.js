const assert = require("assert");
const PostController = require("../post.controller");

describe("Post Controller", function () {
  describe("#get()", function () {
    it("should error when no data is present in the db", async function () {
      return PostController.get({}).catch((error) => {
        assert.equal(error.message, "Please pass id for getting the post.");
      });
    });
  });
  describe("#delete()", function () {
    it("should error when no data is present in the db", async function () {
      return PostController.delete({}).catch((error) => {
        assert.equal(error.message, "Please pass id for deleting the post.");
      });
    });
  });
});
