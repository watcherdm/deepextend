var _ = require("underscore");

require("../deepextend");
describe("deepextend", function(){
  describe("deep objects", function(){
    beforeEach(function(){
      this.mockObject = {
        one: {
          two: []
        }
      };
      this.secondObject = {
        one: {
          two: [this.mockObject.one],
          three: {}
        }
      };
      _.deepextend(this.mockObject, this.secondObject);
    });

    it("should extend the second object onto the first", function(){
      expect(this.mockObject.one.three).toBeDefined();
    });

    it("should extend arrays properly", function(){
      expect(this.mockObject.one.two.length).toBe(1);
    });
  });

  describe("multiobject collapsing", function(){
    beforeEach(function(){
      this.objects = [
        {test: 1, one: true},
        {test: 2, two: true},
        {test: 3, three: true}
      ]
      _.deepextend.apply(_, this.objects);
    });
    it("should smoosh the last values", function(){
      expect(this.objects[0].test).toBe(3);
    });
    it("should retain all unique keys", function(){
      expect(this.objects[0].one).toBe(true);
      expect(this.objects[0].two).toBe(true);
      expect(this.objects[0].three).toBe(true);
    });
  });

  describe("multicontent arrays", function(){
    beforeEach(function(){
      this.mockObject = [{one: true}, {two: true}];
      this.secondObject = [{three: true}];
      _.deepextend(this.mockObject, this.secondObject);
    });
    it("should merge the first object", function(){
      expect(this.mockObject[0].one).toBe(true);
      expect(this.mockObject[0].three).toBe(true);
    });
  });
});
