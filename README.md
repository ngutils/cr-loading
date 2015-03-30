## crLoading
[![Build Status](https://travis-ci.org/ngutils/cr-loading.svg)](https://travis-ci.org/ngutils/cr-loading)  

```html
<button class="btn" cr-loading>Login</button>
```
![](http://s11.postimg.org/8ypjcppz7/crloading_2_1.gif)

This directive is written on [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar) and use it to manage interpolation with `$http`.

## Install
```
bower require cr-loading 
```
```javascript
angular.module("myApp", [
  "cr-loading"
])
```

# Configuration
You can change classes to append into the icon element from `crLoadingProvider`.
```javascript
angular.module("myApp", [
  "cr-loading"
])
.config(["crLoadingProvider", function(crLoadingProvider){
  crLoadingProvider.setClickSpinnerClass("my custom class");
});
```
