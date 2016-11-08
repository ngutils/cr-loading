angular.module('cr.loading', [
  'angular-loading-bar',
  'ngAnimate'
])
.constant("crLoading.config", {
  "clickSpinnerClass": "fa fa-spin fa-spinner spin",
  "clickSpinnerIcon": "spiral",
  "clickSpinnerElement": "i",
  "clickSpinnerTimeout": 250
})
.provider("crLoading", ["crLoading.config", function(config) {
  var self = {};

  self.clickSpinnerClass = config.clickSpinnerClass;
  self.clickSpinnerElement = config.clickSpinnerElement;
  self.clickSpinnerTimeout = config.clickSpinnerTimeout;
  self.clickSpinnerIcon = config.clickSpinnerIcon;

  self.getClickSpinnerClass = function()
  {
    return self.clickSpinnerClass;
  }
  self.getClickSpinnerElement = function()
  {
    return self.clickSpinnerElement;
  }

  this.setClickSpinnerElement = function (s)
  {
    self.clickSpinnerElement = s;
  }

  this.setClickSpinnerClass = function(s)
  {
    self.clickSpinnerClass = s;
  }

  self.getClickSpinnerTimeout = function()
  {
    return self.clickSpinnerTimeout;
  }

  this.setClickSpinnerTimeout = function (s)
  {
    self.clickSpinnerTimeout = s;
  }
  self.getClickSpinnerIcon = function()
  {
    return self.clickSpinnerIcon;
  }

  this.setClickSpinnerIcon = function (s)
  {
    self.clickSpinnerIcon = s;
  }


  this.$get = [function(){
    return self;
  }];

  return this;
}])
.directive('crLoading', ['$timeout', 'crLoading', '$compile', function($timeout, crLoading, $compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var el = null;
      scope.loader = function() {
        // $(el).blur();
        scope.oldClass = "";
        el.attr('disabled', 'disabled');
        if(el.find(crLoading.getClickSpinnerElement()).length === 0) {
          el.prepend(angular.element('<' + crLoading.getClickSpinnerElement() + '>'));
        }
        else {
          scope.oldClass = el.find(crLoading.getClickSpinnerElement()).attr('class');
        }
        el.addClass("cr-loading");
        $compile(el.contents())(scope);
        el.find(crLoading.getClickSpinnerElement()).attr('class', crLoading.getClickSpinnerClass()).attr('icon', crLoading.getClickSpinnerIcon());
        scope.$on('cfpLoadingBar:loaded', function(event, data) {
          $timeout(function() {
            el.removeAttr('disabled');
            el.removeClass("cr-loading");
            if(scope.oldClass) {
              el.find(crLoading.getClickSpinnerElement()).attr('class', scope.oldClass);
            }
            else {
              el.find(crLoading.getClickSpinnerElement()).remove();
            }
          }, crLoading.getClickSpinnerTimeout());
        });
      };

      if(element[0].tagName == "FORM") {
        element.bind('submit', function() {
            var els = element.find('button');
            for(var iii in els) {
              if(els[iii].type == "submit") {
                el = angular.element(els[iii]);
              }
            }
            if(el) {
              scope.loader();
            }
          });
      }
      else {
        el = element;
        el.bind('click', scope.loader);
      }
    }
  };
}]);
