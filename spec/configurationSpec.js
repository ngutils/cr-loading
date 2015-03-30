describe("crLoading default configuration", function(){

  var provider;

  beforeEach(module("cr.loading"));
  beforeEach(inject(["crLoading", function(_crLoading_){
    provider = _crLoading_;
  }]));

  it("return default configuration of spinner class", function(){
    expect(provider.getClickSpinnerClass()).toBe("fa fa-spin fa-spinner spin");
  });

  it("override click spinner class", function(){
    provider.setClickSpinnerClass("override");
    expect(provider.getClickSpinnerClass()).toBe("override");
  });
});
