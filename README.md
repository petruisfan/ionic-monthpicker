# ionic-monthpicker
Monthpicker for ionic

![Example](/screenshots/screenshot.png?raw=true)

## How to use

1) Install it:

```shell
$ bower install ionic-monthpicker --save
```

2) Add the js to your html:

```html
<script src="lib/ionic-monthpicker/dist/ionic-monthpicker.min.js"></script>
```

3) Import in your controller:

```JavaScript
angular.module('app', ['ionic', 'ionic-monthpicker'])
    .controller(function( MonthPicker ) {
        MonthPicker.init({});
        $scope.buttonTap = function() {
            MonthPicker.show(function(res) {
                console.log(res);
            });
        }
    });
```

## Available options:

| Key  | Type | Defaul | Why? |
| ---- | ---- | ------ | ---- |
|minMonthIndex | int | 0 | Minimim month index |
|minYear | int | new Date().getFullYear() | Minimum year |
|maxMonthIndex | int | new Date().getMonth() | Maximum month index |
|maxYear | int | new Date().getFullYear() | Maximum year | 
|startingYear | int | maxYear | Set the starting year |
|monthLabels | array | ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] | Month labels to display |
|title | string | "Select month" | Popup title |
|cancelText | string | "Cancel" | Cancel button text |
|cancelClass | string | "button-assertive" | Class to apply to the cancel button |
