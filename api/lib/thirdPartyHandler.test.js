const assert = require("assert");
const nock = require("nock");
const data = require("./data.test");
const handler = require("./thirdPartyHandler");

describe("Third Party Handler", function() {
  describe("#dummyService()", function() {
    beforeEach(() => {
      nock("http://localhost:3001")
        .get(`/?token=${data.dummyToken}&phoneNo=${data.dummyPhoneNo}`)
        .reply(200, data.success);
    });
    it("should not throw error when service is working", function(done) {
      handler
        .dummyService(data.dummyToken, data.dummyPhoneNo)
        .then(returnedData => {
          assert.deepEqual(returnedData, data.success);
          done();
        })
        .catch(err => {
          assert.not.exist(err);
        });
    });
  });
});
