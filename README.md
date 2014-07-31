widget-settings-ui-core
=======================
[![Build Status](http://devtools1.risevision.com:8080/view/Widgets%20and%20Components/job/Component-Widget-Settings-UI-Core-Master/badge/icon)](http://devtools1.risevision.com:8080/view/Widgets%20and%20Components/job/Component-Widget-Settings-UI-Core-Master/)

Core components shared across Angular-based widget settings UI

### Angular Widget Settings UI Page

A controller, ```settingsController```, is provided to enable settings loading and saving for UI page.

To create the settings UI page, use the ```ng-controller``` directive to reference ```settingsController``` at the top level DOM of your settings page, say in the ```<body>``` tag or one of the top ```<div>``` tags.

A settings parameter can be of one of the following types:
- URL parameters, stored in ```$scope.settings.params```
- Additional parameters, stored in ```$scope.settings.additionalParams```

Each settings parameter is binded either to a input control in the scope, or in a Angular custom component (directive).

### Legacy Components

In the case of a legacy component (e.g. a jQuery component wrapped in an Angular directive), two-way data binding must be achieved by listening to the ```collectAdditionalParams```.

A ```collectionAdditionalParams``` event is triggered whenever the settings UI controller is about to save a page.

```javascript

angular.module("...").directive("exampleCustomInput", {
  ...
  scope: {
    someParams: "="
  },
  link: function ($scope, $element) {
    $scope.$on("collectAdditionalParams", function () {
      $scope.someParam = $element.someJqueryMethod();
    });
  }
});

```

### Setitings Angular Service

- ```settingsGetter``` low-level service that saves URL and additional parameters to Gadget API
- ```settingsSaver``` low-level service that retrievers URL and additional  parameters from Gadget API

### Default Settings

In widgets, one may supply a default set of settings, which will be loaded during controller's initialization phase:
```
angular.module("app").value("defaultSettings", {
    params: { foo: "bar" }
    additionalParams: {...}
  });
```


## Documentation
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.


## Contribution
If you are considering contributing to this open source project, our favourite option, we have 3 good reasons why we released this code under version 3 of the GNU General Public License, and we think they are 3 good reasons for why you should get involved too:

1. Together we can make something far better than we could on our own.

2. If you want to use our code to make something that is specific to you, and that doesn’t fit with what we want to do, we don’t want to get in your way. Take our code and make just what you need.

3. We know that some of you nervous types worry about what happens if our company gets taken out in the zombie apocalypse. We get it, and neither one of us wants to deal with that delicate question of software escrow agreements for the “just in case we kick the bucket scenario”. No worries! We made it easy. No fuss, no cost, no lawyers! We published the software here. Have at it.

Are we missing something? Something could be better? Jump in, branch our code, make what you want, and send us a Pull Request. If it fits for both of us then of course we will accept it, maybe with a tweak or two, test it, and deploy it. If it doesn’t fit, no worries, just Fork our code and create your own specialized application for your specific needs. Or, if you’re just feeling paranoid, download the code, and put it under your mattress.

**Either way, welcome to our project!**
