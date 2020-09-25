Bigos
===

Bigos is a simple, SCSS* only framework**. It's built for modern applications founded on multi module systems. It contains the set of prepared styles, classes and mixins. Comfortable in adaptation and implementation, let you systematize app based on scalable skeleton.

**Major and most important advantage is brevity. This framework includes only base and most needed components. You will not find here complex blocks of styles like in Bootstrap or Fundation. It's only a strong backbone of your feature application. The rest and more advanced features you can define a base on prepared code.**

**Although, the whole framework is a lean on special class connection system (CCS) and it may impose the certain character of application code writing. Before you go deeper, first check [syntax](#classes-syntax-class-connection-structure) behind it. After this, you can move on.**

*if you're not familiar with, here you'll find more about [SASS](http://sass-lang.com/) and [SCSS](http://stackoverflow.com/questions/5654447/whats-the-difference-between-scss-and-sass) language.

**please note that this is very early alpha version, so far used with success in commercial but limited number of projects, feel free to create bug issue notification or propose code fix/change as a pull request.

**Actual minified weight: 32kb**.

Installation
---

*Right now only as an GitHub repository. Soon as a NPM and Bower packages.*

Docs:
---

* [Structure](#structure)
* [Directory contents](#structure-of-directories)
* [Normalize](#normalize)
* [Variables](#variables)
* [Helpers/Mixins](#helpers--mixins):
   * [Classes syntax](#classes-syntax-class-connection-structure)
   * [Globals](#globals)
   * [Visuals](#visuals)
   * [Abstracts](#abstracts)
   * [Mobile](#mobilerwd)
   * [Additionals](#additionals)
* [Global classes and components](#global-classes-and-components):
   * [Visuals](#visuals-1)
   * [Fonts](#fonts--texts)
   * [Boxes](#boxes)
   * [Tables](#)
   * [Collections](#collections)
   * [Buttons](#buttons)
   * [Inputs](#inputs)
   * [Resets](#resets)
   * [Additionals](#additionals-1)
   * [Icons](#icons)
* [Tests environment](#)
* [Changelog - list of changes and improvements](#changelog)


---
###### Tests SCSS watch path
  `sass --watch src/style.scss:test/style.css`

## Structure

Here's how the whole framework is built. Following individual directories and their contents - files and their dependencies.

<a name=""></a>
#### Structure of directories

    bigos
    |---src

## Normalize
Bigos includes '_normalize.scss' file with styles normalize system. It's based on [Normalize CSS](https://necolas.github.io/normalize.css/ "Normalize CSS") by Nicolas Gallagher. So, framework styles are not reset to default null values - they are adapted to application structure.

## Variables

All variables are defined in `_variables.scss` file. They are devided into three parts: project, global and custom.

* Project part defines all used and dedicated variables like colors or sizes - you can add/create that as much as you want.
* Global variables are used precisely in the whole framework and shuold stay unchaned.
* All others are system editable variables. They define visual part of framework, also they are used in a system classes. You can change them accordingly to your own needs and several elements customiziation (i.g. buttons or inputs). Remember that all variables are strictly connected with other parts of framework and they can not be removed.

All variables are accurately described in the source file.

## Helpers / Mixins

[Mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) are small pieces of code that provide lots of combined style features. They can be used as a definition of box layouts, backgrounds, gradients, positions or shifts. Mixins can contain customized variables that create prepared and systematized blocks of code.

Mixins are an integral part of the framework. You can use them with/as special dedicated class system or separatly. Here you can feel free.

To use one of them type:

```scss
@include mixin-name($variable(s)) {
  // content, not always
};
```

And the list of mixins:

---

### Classes Syntax (Class Connection Structure)

All base classes are built with special class connection structure (CCS). This structure is splitted in three elements: `class-model`, `class-modifier` and `class-option`. It looks like this:

```scss
@include class-model(button) {
  @include class-modifier(color) {
    @include class-option(red) {
      ...
    }
  }
}
```

In output we will recive:

```css
[class*="button"][class*="-color"][class*="_red"] {
  ...
}
```

And HTML usage:

```html
<button class="button-color_red" type="button" />
```

As you can see - or not - that kind of class connection gives us some special amenities, which are:

* clear and compact class presentation
* possibility of alternating use
* ease of class expansion
* internal class injection

Based on this structure you can define style levels depending on the complexity of nesting several HTML elements. It may be familiar with [BEM](https://en.bem.info/methodology/) methodology (block, element, modifier), and acording to it we can build something similar and common.

Of course there is a black side of this solution. Sometimes when classes will have the same name, parts can overwrites each other. To avoid this try to keep unique class modifiers and options even for main blocks/parents.

OK, back to structure...


```scss
@include class-model(block) {
  display: inline-block;
  @include class-modifier(absolute) {
    position: absolute;
    left: 0px;
    @include class-option(top) {
      top: 0px;
    }
    @include class-option(bottom) {
      bottom: 0px;
    }
  }
}
```

CSS output:

```css
[class*="block"] {
  display: inline-block
}
[class*="block"][class*="-absolute"] {
  position: absolute;
  left: 0px;
}
[class*="block"][class*="-position"][class*="-top"] {
  top: 0px;
}
[class*="block"][class*="-position"][class*="-bottom"] {
  bottom: 0px;
}
```

Now you can use it in your HTML in several ways:

* only inline block notation `<div class="block"></div>`
* with absolute position `<div class="block-absolute"></div>`
* or with absolute position on bottom of parent `<div class="block-absolute_bottom"></div>`

`class-modifier` and `class-option` can be used as a mutiple notation i.g.:

```scss
// class modifier
@include class-modifier(color, size, structure) {
  ...
}
// class option
@include class-option(red, big, relative) {
  ...
}
```

Another very important advantage of this construction is use of `class-model` independently within defined code. Regardless of which part of the class function will be used, there will be ability to inject unplanned code.

For example we have this HTML element:

`<div class="this-is-normal-div-with-some-extra_class"></div>`

and it's in the middle of code tree. Right now we have to inject some style to this but we don't have any class/selector definition. So let's use `class-model` notation like this:

```scss
body {
  main {
    // use like this
    @include class-model(normal-div) {
      // code here
      @include class-modifier(with) {
        // code here
        //
        // css output: [class*="div"][class*="-with"]
      }
    }
    // or
    @include class-model(extra) {
      // code here
      @include class-option(class) {
        // code here
        //
        // css output: [class*="extra"][class*="_class"]
      }
    }
  }
}
```

<a name="class-option"></a>
OK. At the end remember to not use `class-option` notation without nested in `class-modifier` above. Element will be not recognized as a dedicated class connection one and styles for it will be not assigned. Be careful especially when you are using the predefined classes.

**Tip**: Inside framework code there will be a lot of class connections examples, analize them to learn more.

---

### Globals

**Vandor prefixer** - may be not necessary as much right now but still needed.

`prefixr($attribute, $value, $prefixes)`

* `$attribute` - style atribute like `border-radius`
* `$value` - style value like `10px`
* `$prefixes` - used browser prefixes like `moz, webkit`

*prefixr mixin is used over almost all other mixins.


**Float clearfix** - `clearfix()` - simple and common

---

### Visuals

**Font size***

`font-size($size: $font-base-size, $inherit: true)`

* `$font-base-size` variable defined globally
* `$inherit` - switch to false to overwrite font size value

**Line height***

`line-height($line-height: $font-base-line-height)`

* `$font-base-line-height` variable defined globally
* line height has the same size factor as font size value

*font size and line height are defined in rem units ([more about here](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/))

**Font reset** - `font-reset()` - will reset/normalize style, weight and variant of font values

**Text hide** - `text-hide()` - will hide but not disable text

**Text wrap** - `text-wrap()` - will wrap to long text

**Text truncate** - `text-truncate()` - will truncate to long text, remember that not all browsers support this feature

**Font face**

`font-face($font-face-name, $font-face-path: $font-custom-path)`

* may be not needed because it's defined top-down, the one and only thing that you should define to use custom font face is set up name and path to it in `_variables.scss` file
* the same for icons font face, enable and define in `_variables.scss` file

**Font icon**

`font-icon($code)`

* icons as a font face are defined by special classes ([more about here](#icons)), but if the need arises use this mixin with the same code as in `_icons.scss` file defined for `$code` variable i.g. "\e900\"

**Border radius** - `border-radius($radius: 5px)` - set `50%` value to fully round your object

<a name="border-radius-unregullar"></a>
**Border radius unregullar**

`border-radius-unregullar($top-left: 0, $top-right: 0, $bottom-left: 0, $bottom-right: 0)`

* remember that you can use here more than one value as a one corner setup ([more about here](https://lea.verou.me/humble-border-radius/#for-browser))

**Box shadow**

`box-shadow($shadow-1, $shadow-2, ..., $shadow-4)`

* possibility of using more than one box shadow setup

**Opacity** - `opacity($alpha)` - just set a value form 0 to 1 / `.2`

**Input placeholder color** - `placeholder-color($color)` - use for text inputs and textareas

**Element fully disabled** - `element-disabled()` - fully out of DOM painting

**Element matched**

`element-matched($type: border-box)`

* for accuracy this is box sizing setup

**Element with custom width**

`element-width-custom($width: 100%, $margin-top: false, $margin-bottom: false)`

* this mixin sets up an element width and puts it at the center of relative parent, to change centered position use `$margin-top` or `$margin-bottom` variables
* great for setting positions of main layout blocks like `<section>` or `<main>` ([more about HTML5 tags](http://html5doctor.com/))

**Element with full height** - `element-height-full()` - set up full height relatively to parent

**Element size**

`element-size($size)`

* `$size` variable should have one (only for width) or two (for width and height) values notation like `20px` or `20px 100px`, of course you can use any other unit like `pt` or `vm/hm`

**Position absolute centered**

`position-absolute-center($top: 0)`

* will put element in absolute position but at the center of parent element
* change `$top` variable to move element

**Custom absolute/fixed position**

`position-absolute-custom($coords: 0 0 0 0, $fixed: false)`

* `$coords` of absolute position (top right bottom left) should be written without commas
* notice that unitless values will be not included as a position value - i.g. if you set `0px 0 0 0px` in output there will be only `position: absolute; top: 0px; left: 0px;` notation
* change `$fixed` variable to exactly `fixed` value to set position on it

**Element verticaly aligned** - `element-vertical-align()` - uses `transform-translate()` mixin

**Background clipping** - `background-clip($clip)`

**Covered background**

`background-cover($image, $bg-position-x, $bg-position-y, $box-width, $box-height)`

* `$image` variable is only a file name, if you have non-typical images/backgrounds path please change `$global-images-path` variable in `_variables.scss` file
* you must provide all of variables to correctly set background as a block cover - great for flat big photos layouts

**Custom background**

`background-custom($image, $position-horizontal: center,  $position-vertical: top, $background-repeat: no-repeat, $background-size: auto)`

* `$image` variable is only a file name, if you have one non-typical images/backgrounds path please change `$global-images-path` variable in `_variables.scss` file

**Multiple backgrounds**

`background-multiply($background_1, $background_2: false, $background_3: false)`

* possibility of using more than one background

**Sprites**

`background-sprite($x: 0, $y: 0, $retina: false)`

* fill `$x` and `$y` variables as a assigned icon position on your sprite file
* this mixin contain couple of additional variables: `$global-sprite-type`, `$global-sprite-name` and `$global-sprite-size`; all of them are defined globally in `_variables.sccs' file
* also it provides retina displays ([more about here](https://en.wikipedia.org/wiki/Retina_Display)) setup, so if you're preparing mobile version of your application remember to create special retina ready sprite file: `@2x`

**Gradients***

`background-gradient-linear($position: 0, $from: #fff 50%, $color-a: false, $color-b: false, $color_c: false)`

* possibility of using more than two color gradient (max 4)
* remember that you can manipulate position of gradients move ([more about here](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient))
* use numeric values to set gradient direction or conected predefined definitions

*there is no radial gradient mixin - sory

---

### Abstracts

**Tansform custom** - `tranform-custom($params)`

**Transform rotate** - `transform-rotate($degrees: 0)` - use only a number of degrees

**Transform scale** - `transform-scale($factor: 0)`

**Transform skew** - `transform-skew($x: 0, $y: 0)` - use only a number of degrees

**Transform translate** - `transform-translate($x: 0, $y: 0)`

**Transform translate 3D** - `transform-translate3d($perspective: 100px, $x: 0, $y: 0, $z: 0)`

**Transform origin** - `transform-origin($x: 0, $y: 0)`

*more and complex specs about CSS3 transforms you will find [here](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function)

**Transition all**

`transition-all($time: 300ms)`

* it will smoothly transit all defined properties
* you can change transition time

**Custom transition**

`transition-custom($property, $time: 300ms, $type: ease-in-out)`

* define one of style property that you want to transition
* you can change time and type o transition

**Transition with cubic bezier**

`transition-cubic($property, $time)`

`transition-cubic-params($param-a: 0, $param-b: 0, $param-c: 0, $param-d: 0)`

* these two mixins must act together
* transitions with cubic bezier effect are complicated but very powerfull
* you can use them instead of more aggravating keyframes animations
* more about cubic bezier transitions you will find [here](http://callmenick.com/post/level-up-your-css-animations-with-cubic-bezier), also you can use ready to go [generator](http://cubic-bezier.com/#.17,.67,.83,.67)

**Animations**

`animation-custom($animation-name, $coords: 0 0 0)`

`animation-keyframe(animation-name)`

* these two mixins must act together
* `animation-custom` mixin define animation name and coordinates (these must arrive with no comma notation):
  * `$duration` - time duration of the animation
  * `$delay` - delay before the animation starts
  * `$iteration` - the number of animation repetitions
* `animation-keyframe` is an defined above animation call, in content of this mixin you can set a whole scenario and animation schema

Simple usage example:

```scss
div {
  @include animation-custom(fadeout, 2s 0 infinite);
  @include animation-keyframe(fadeout) {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
}
```
This will build "fadeout" animation that will take 2 seconds, will be repeated infinite times and will be delayed 0 seconds. The core feature will be change opacity property from 1 to 1 in a 100% process schema.

More about CSS animations you can find [here](http://www.w3schools.com/css/css3_animations.asp).

---

### Mobile/RWD

Mobile mixins are nothing other than define of @media-queries rules ([more about here](https://developer.mozilla.org/pl/docs/Web/CSS/Media_Queries/Using_media_queries)). All dimensions are defined as a global variables and they are adapted to the most common mobile devices, phones and tablets.

There are two types of mobile mixins. They are built in a slightly different way than other mixins. One of this group comes with the possibility to customize viewport width value, second is predefined for most popular mobile devices.

This is the list of dimension names and connected breakpoint variables defined in `_variables.scss` file:

```
large-screen - $breakpoint-largescreen
big-screen - $breakpoint-bigscreen
app-width - $breakpoint-appwidth
ipad-landscape - $breakpoint-ipad-max
ipad-portrait - $breakpoint-ipad-min
tablet-portrait - $breakpoint-tablet-min
tablet-landscape - $breakpoint-tablet-max
ipad-mini - $breakpoint-ipad-min
iphone6-landscape - $breakpoint-iphone6-max
iphone6-portrait - $breakpoint-iphone6-min
iphone5-landscape - $breakpoint-iphone5-max
iphone-landscape - $breakpoint-iphone-max
iphone-portrait - $breakpoint-iphone-min
```
Now, the core of mobile mixins usage looks like this:

`breakpoint($breakpoint, $direction: false)`

If you want to use it with custom viewport values use:

```scss
@include breakpoint(640px) {
  // content code here will append styles
  // for all devices with 640px width or less
}
```
as you probably noticed there is one other variable `$direction`. This define viewport/device width range that will assign code to the resolution.

Three options in here:

* `from-to` - range from to selected resolution
* `from` - range only from selected resolution
* `to` - range only to selected resolution

and usage:

```scss
@include breakpoint(640px 1024px, 'from-to') {
  // content code here will append styles
  // for all devices that can display 640px but not less
  // and devices that can display not more that 1024px
}

@include breakpoint(640px, 'from') {
  // content code here will append styles
  // for all devices that can display more than 640px but not less
}

@include breakpoint(640px, 'to') {
  // content code here will append styles
  // for all devices that can display less then 640px but not more

  // it's the same mixin as lonely `breakpoint(640px)`
  // except that here we know exactly what range is defined
}
```

This was the first group of mobile mixins. The second one is more transparent.

So, as a value of `$point` use one of predefined dimension names. i.g.

```scss
@include breakpoint(iphone6-landscape) {
  // content code here will append styles
  // for iPhone 6 landscape view	and less
}
```
*notice that all of this predefined rules comes with additional style properties like device pixel ratio

---

### Additionals

**Calc** - `calc($property, $value)` - ([more about here](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)) - great for mobile features

**Interface Appearance**

`appearance($value: none)` -

* the appearance property is used to display an element using a platform-native styling based on the users' operating system's theme
* you can enable it using this mixin

**User Select** - `user-select($value: none)` - ([more about here](https://css-tricks.com/almanac/properties/u/user-select/))

**Image render** - `image-rendering($type: crisp)` - ([more about here](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering))

**Columns**

`columns-custom($column-width: 200px, $column-count: 0, $column-gap: 20px, $column-rule: false)`

* this contains additional scaling variables which are: `$base-unit-size`, `$base-unit-type` and `$base-unit`
* you can skip `$column-count`, `$column-gap` and `$column-rule` then mixin will build columns layout by default
* the `$column-rule` variable should contain three coords defined without comma notation, they are: `$width $style $color`
* more about CSS column layout you will find [here](https://css-tricks.com/almanac/properties/c/columns/)

## Global classes and components

As already mentioned, framework has prepared class system. They can help build overall layout structure and support main and common project styling. You will find here definitions for that kind of features like grids, shifts, borders, backgrounds, text, etc. All of them are defined in special `_base.scss` file. They are strictly based on system variables.

Before you will start using them check again the class connection methodology [here](#classes-syntax-class-connection-structure), and the model/modifier/option rules (also [read this](#class-option)).

<a name="array-variables"></a>
**Important** - At some class models there are defined speical pair of variables (`$property-option-name` and `$property-option-code`). They appear to define colors and sizes of several elements. They are written in a comma notation. Please keep them unchanged because this construction works like array and system will iterate by them to build these classes. You can add another colors and corresponding names, aldo remember to keep the same number of both and keep some color prefix. Prefix? What for? In some cases compiler may treat them as a hex color presentation and generate color code instead of color name.

### Visuals

All HTML elements in project markup will recive `box-sizing` property set to `border-box` and all of them will gonna have reset `outline` property (this applies mainly to buttons and inputs).

---

**Links**

Full links/anchors configuration you can handle by changing dedicated variables for them in `_variables.scss` file. Also you can use special class `link` for any text object in your project. Before that, set up default links/anchors configuration.

Couple avaliable variables:

* `$link-base-color` - this is clear
* `$link-decoration` - set link decoration true/false
* `$link-decoration-type` - if you will set link decoration on `true` this variable will attach dedicated link decoration, by default `underline`
* `$link-hover-type` - this variable will handle hover state for links, set here *"color"* property if you want change link color on hover, if not, leave none to keep none hover state for links, set *"underline"* or other property to set other link hover state
* `$link-hover-color` - if you will use `color` as a link hover type this variable will set chosen color, blue by default
* `$link-visited-color` - this is clear

The `link` class - you can use it for inline text elements. For those there are separated variables:

* `$link-class-type` - this is clear - `underline` or `color`
* `$link-class-hover-type` - the same as above

There is also special configuration to set links oposite type named `naked`; and the variables:

* `$link-class-naked-hover-type` - `underline` or `color`
* `$link-class-naked-hover-color` - used if `$link-class-naked-hover-type` is `color`

Class model

```html
<!-- this will append all properties from normal link element and will set it as a block element -->
<span class="link"></span>
```

Class modifiers

```html
<!-- the same as for above one but as a inline-block element -->
<span class="link-inline"></span>

<!-- the same as normal link element but without any decoration for normal and hover state -->
<span class="link-naked"></span>

<!-- of course you can use them together -->
<span class="link-naked-inline"></span>
<!-- or -->
<span class="link-inline-naked"></span>
```
---

**Cursors**

This class will help you to set preferred element cursor type

Class model

```html
<!-- this will set only cursor property on auto for all element children -->
<section class="cursor"></section>
```

Class modifiers

```html
<!-- this will set cursor property on pointer -->
<section class="cursor-pointer"></section>

<!-- this will set cursor property on default -->
<section class="cursor-default"></section>

<!-- this will set cursor property on auto -->
<section class="cursor-auto"></section>
```

Class option

```html
<!-- this will set defined cursor property for all children -->
<section class="cursor-pointer_inherit"></section>
<!-- or -->
<section class="cursord-default_inherit"></section>
```
---

**Backgrounds**

By using background class model you can set colors for them.

There are defined two special variables for this purpose:

* `$background-color-name`
* `$background-color-code`

[Read again how this construction works](#array-variables).

Class model

```html
<!-- it does not do anything - we need class modifier and option -->
<section class="background"></section>
```

Class modifier

```html
<!-- it does not do anything - we need class option -->
<section class="background-color"></section>
```

Class option

```html
<!-- use class option as a defined color name to set background for section element -->
<section class="background-color_bwhite"></section>
<!-- or -->
<section class="background-color_bblack"></section>
<!-- or -->
<section class="background-color_grey"></section>

<!-- you can use all of defined colors in _variables.scss file and feel free to add your's -->
```
---

**Borders**

Border class model:

```html
<!-- it does not do anything - we need class modifier and option -->
<section class="border"></section>
```

*Types*

Border types are notated as a class options: `top, left, right, bottom, full`

Usage:

```html
<section class="border_top"></section>
<!-- or -->
<section class="border_right"></section>
<!-- or -->
<section class="border_full"></section>
```

these class options will define which side of element will style our borders. Note that used solo will not gives visible resaults. You have to use another modifiers to menage border classes i.g. with color modifier.

*Colors*

Colors are defined as a standard list of name/code notation. You can use all of defined colors or add your own in `_variables.sccs` file.

Usage:

```html
<section class="border-color_bwhite"></section>
<!-- or -->
<section class="border-color_bblack"></section>
<!-- or -->
<section class="border-color_bred"></section>

<!-- color as a class modifier and color name as a class option -->
```

By using this class notation you will recive full elemnet border color, but if you want to set color for only one type of element border connect these two class modifiers like this:

```html
<section class="border_left-color_bwhite"></section>
<!-- or -->
<section class="border_full-color_bblack"></section>
<!-- or -->
<section class="border_bottom-color_bred"></section>
<!-- or -->
<section class="border_bottom_right-color_bred"></section>
<!-- or -->
<section class="border_bottom_top-color_bred"></section>
```

*Border radius*

There are four options to style element border radius

* `circle` - will set fully rounded element
* `small, medium, big` - defined in `_variables.scss` file, by default in sequence `2px, 5px, 10px`

Usage:

```html
<section class="border-radius_circle"></section>
<!-- or -->
<section class="border-radius_small"></section>
```
For more advanced border radius configuration use dedicated mixin ([more about here](#border-radius-unregullar)).

*Bold*

Besides all of these options there is also bold border modifier. For thickness responds `$border-bold-size` variable, use it like this:

```html
<section class="border_right-bold"></section>
```
---

**Shifts**

Shifts are simple, this is just a classes for margins and paddings. They are fastened together by special shifts mixin. Probably you notice before, that is no description about it - this one is special and there will be not need to use.

By default shifts are iterated 6 times. The gap between them is defined by `$shift-overall` global variable (`5px` by default). This means that the increase of value is proportional to the repetitions number. Number of repetitions you can change by changing the `$shift-iteration` variable.

There are plenty options of shifts configuration:

* `full`
* `top, bottom, left, right`
* `horizontal, vertical`

For shift type responds class modifier `margin` or `padding` used with `shift` class model.

```html
<section class="shift-margin_1"></section>
```

OK, quick instruction - this will set margin property on `5px`. 5 because `$shift-overall` variable is `5px`. Increase the factor to 2 to get `10px` value. By default there is 6 steps interation and this will provide `30px` value of margin property. The same for paddings. To reach higher range, change `$shift-iteration` variable.

Full options:

```html
<!-- section { margin: 5px; } -->
<section class="shift-margin_1"></section>

<!-- section { margin: 15px; } -->
<section class="shift-margin_3"></section>

<!-- section { margin: 30px; } -->
<section class="shift-margin_6"></section>

<!-- section { padding: 30px; } -->
<section class="shift-padding_6"></section>
```

Sides options:

```html
<!-- section { margin: 10px 0 0 0; } -->
<section class="shift-margin_2-top"></section>

<!-- section { margin: 0 10px 0 0; } -->
<section class="shift-margin_2-right"></section>

<!-- section { padding: 0 0 0 25px; } -->
<section class="shift-padding_5-left"></section>
```

And vertical, horizontal options:

```html
<!-- section { margin: 10px 0; } -->
<section class="shift-margin_2-vertical"></section>

<!-- section { padding: 0 10px; } -->
<section class="shift-padding_2-horizontal"></section>
```

### Fonts / Texts

`strong` tag is handled by custom predefined font variables. So if you are using custom font face with bold variant and this font face is your master, all strong elements will recive bold font face for `font-family` property.

---

**Text**

`text` class model comes with `color`, `size` and `align` modifiers.

Colors are defined as a standard list of name/code notation. You can use all of defined colors or add your own in `_variables.sccs` file.

```html
<span class="text-color_bwhite"></span>
<!-- or -->
<span class="text-color_bgrey"></span>
```

Almost the same "relationship" applies to text sizes. For this, there are `$font-sizes-name` and `$font-sizes-number`. Use predefined names and sizes or change them to your own. Remember only, that this still works like an array and all values is precisely connected with each other.

```html
<span class="text-size_small"></span>
<!-- or -->
<span class="text-color_big"></span>
```

Text align - `left`, `center` and of course `right`.

```html
<span class="text-align_center"></span>
<!-- or -->
<span class="text-align_right"></span>
```

Text uppercase - use `uppercase` modifier.
Text capitalize - use `capitalize` modifier.

**Important** - The text class model is a great opportunity to show connection feature.

```html
<!-- set text color to white, size to tiny (12px) and alignment to right -->
<span class="text-color_bwhite-size_tiny-align_right"></span>

<!-- or set alignment on center and size to huge -->
<span class="text-align_center-size_huge"></span>
```
---

**Fonts**

Configuration for fonts is simple and fully based on predefined variables.

Want to use custom font face? Enable it by changing `$font-custom` to `true` and define names for several typeface. Your font face is master? Set `$font-custom-master` on `true`.

Secondary custom font face? Like above, but use special variables for `$font-secondary`. Framework does not provide third option for custom font face. Three different font faces? Really?

Holla, wait, there is a custom font face class.

If you are using custom typeface not as a primary one you have three special classes to inject style linearly.

* `.cf` - assigned to `$font-base-regular`
* `.cfb, .cfs` - assigned to `$font-base-bold`
* `.cfl` - assigned to `$font-base-light`

**Headings**

Classically we have six defined headings. The size is defined by special variables: `$headings-size` and `$headings-size-factor`. Similar for line height: `$headings-lineheight-size` and `$headings-lineheight-factor`. Both of them are made proportionately by size from 1-6.

For additional comfort framework provide special headings classes - `.h1 .h2 .h3 .h4 .h5 .h6`. Use them - if you need - for none heading elements.

---

### Boxes

Most likely this class model is most powerful and complex. Follow the all modifiers and remember that you can connect all of them.

Main model

```html
<section class="box"></section>
```

By default this model does nothing. As probably you thought there is no any `display` property notation. Why? It's simple - this model should be used for default HTML block/box elements and they as you know comes with `block` value.

*Full Size*

Add full `width` and `height` size for box.

```html
<!-- width on 100% of parent -->
<section class="box-full_width"></section>

<!-- width on 100% of screen -->
<section class="box-full_width_ofscreen"></section>

<!-- height on 100% -->
<section class="box-full_height"></section>

<!-- height on 100% of screen -->
<section class="box-full_height_ofscreen"></section>

<!-- flexible height - sets height on auto -->
<section class="box-full_height_flexible"></section>
```

*Relative box*

```html
<!-- relative box position -->
<section class="box-relative"></section>
```

---

<a name="grid-system"></a>
**Grid**

Grid system construction is simple and generally quite universal. There is `grid` parent element and inside `column` notation. By default grid is splitted into 12 parts - if you want less or more please change `$grid-count` global variable.

Column is an another class model and it cooperates closely with `grid` parent. For them we have `width` modifier with number notation (1-12). Width of columns is defined in `%` units.

Usage:

```html
<!-- /-/------------/ -->
<section class="box-grid">
  <div class="column-width_1"></section>
  <div class="column-width_11"></section>
</section>

<!-- /--/-----------/ -->
<section class="box-grid">
  <div class="column-width_2"></section>
  <div class="column-width_10"></section>
</section>

<!-- /---/----------/ -->
<section class="box-grid">
  <div class="column-width_3"></section>
  <div class="column-width_9"></section>
</section>

<!-- /----/---------/ -->
<section class="box-grid">
  <div class="column-width_4"></section>
  <div class="column-width_8"></section>
</section>

<!-- /-----/--------/ -->
<section class="box-grid">
  <div class="column-width_5"></section>
  <div class="column-width_7"></section>
</section>

<!-- /------/-------/ -->
<section class="box-grid">
  <div class="column-width_6"></section>
  <div class="column-width_6"></section>
</section>

<!-- /-------/-----/ -->
<section class="box-grid">
  <div class="column-width_7"></section>
  <div class="column-width_5"></section>
</section>

<!-- /--------/----/ -->
<section class="box-grid">
  <div class="column-width_8"></section>
  <div class="column-width_4"></section>
</section>

<!-- /---------/---/ -->
<section class="box-grid">
  <div class="column-width_9"></section>
  <div class="column-width_3"></section>
</section>

<!-- /----------/--/ -->
<section class="box-grid">
  <div class="column-width_10	"></section>
  <div class="column-width_2"></section>
</section>

<!-- /-----------/-/ -->
<section class="box-grid">
  <div class="column-width_11"></section>
  <div class="column-width_1"></section>
</section>

<!-- /------------/ -->
<section class="box-grid">
  <div class="column-width_12"></section>
</section>
```

Be sure that for the `grid` parent is defined width. If not, use `full_width` class modifier. Like this:

```html
<section class="box-grid-full_width">
  <div class="column-width_11"></section>
  <div class="column-width_1"></section>
</section>

<!-- by default grid box has relative position -->
```
At the end you need to know that `grid` parent will set additional properties for it self.

It will recive:

* `font-size` property on `0`
* `position` on `relative`
* and `height` on `auto`

`font-size` reset is for full and hassle-free columns fitting.

Where are the grid gaps? There is no any. Why you ask. Because it affects simple and clean construction of grid system. However there is simple way to achive this solution. How? By using padding shifts.

Usage:

```html
<section class="box-grid-full_width">
  <div class="column-width_11 shift-padding_2-left"></section>
  <div class="column-width_1 shift-padding_2-right"></section>
</section>
<!-- or -->
<section class="box-grid-full_width">
  <div class="column-width_4 shift-padding_2-horizonatl"></section>
  <div class="column-width_4 shift-padding_2-horizonatl"></section>
  <div class="column-width_4 shift-padding_2-horizonatl"></section>
</section>
```

Remember that all elements still have `border-box` value for `box-sizing` property and using paddings will not affects on column box width. They will stay as a brief, column based construction. Remember to not use margin shifts for column gapping - they will be moved not gapped.

---

**Box with aligned elements**

By using this class modifier you will set vertical align for all first level child elements.

*Vertically aligned center*

```html
<section class="box-vertical_align_transform"></section>
```

This class modifier uses `transform-translate` to fit elements vertically centered.

*Aligned to ...*

```html
<!-- top -->
<section class="box-vertical_align_top"></section>
<!-- middle -->
<section class="box-vertical_align_middle"></section>
<!-- bottom -->
<section class="box-vertical_align_bottom"></section>
<!-- baseline -->
<section class="box-vertical_align_baseline"></section>
```
Remember that all alinged elements should have set `inline-block` value for `display` property. You can achieve this by using inline class modifier - look below.

---

**Box with inline elements**

OK, you have simple modifier `inline` and two options to set all first level children or selected one as a `inline-block` element.

Usage:

```html
<!-- all first level children will be inline-block elements -->
<section class="box-inline_full"></section>

<!-- selected elements will be inline-block -->
<section class="box-inline">
  <div class="element-inline"></div>
  <div></div>
</section>
```

---

**Box with image inside**

This modifier will help you to set and precisely fit image to the parent size.

Usage:

```html
<section class="box-image">
  <img src="" class="element-image" />
</section>

<!-- or if image is placed in another block
use inherit class option -->
<section class="box-image">
  <div class="element-image_inherit">
    <img src="" />
  </div>
</section>
```

---

**Floated box**

Usage:

```html
<!-- right -->
<section class="box-float_right"></section>
<!-- or left -->
<section class="box-float_left"></section>
```
Note that this will set `float` property exactly for this element, not for children.

---

**Flex box**

Use `flex` class modifier and particular options:

*Content justify*

* `start`, `middle`, `end`, `spacebetween`, `spacearound`, `spaceevenly`

Use as a class option  with class modifier `content` and class option `justify`:

```html
<section class="box-flex-content_justify_bottom"></section>
<!-- or -->
<section class="box-flex-content_justify_center"></section>
```

*Content alignment*

If your flex box items fills more than two lines you can set vertical alignment for them, but only when the parent container has bigger height than content.

* `start`, `middle`, `end`, `spacebetween`, `spacearound`, `stretch`

Use as a class option with class modifier `content` and class option `align`:

```html
<section class="box-flex-content_align_top"></section>
<!-- or -->
<section class="box-flex-content_align_middle"></section>
<!-- or -->
<section class="box-flex-content_align_spacebetween"></section>
```

*Items wrapping*

By default flex box items wrapping to the next line, if they're not fit to the block/container width. If you want to avoid that behavior set special class option on `nowrap`.

Usage:

```html
<section class="box-flex_nowrap"></section>
```

*Items alignment*

* `top`, `middle`, `bottom`, `baseline`, `stretch`
* `auto` - only for single item alignment

Use as a class option with special class modifier/option `content` and `items`):

```html
<section class="box-flex-content_items_top"></section>
<!-- or -->
<section class="box-flex-content_items_middle"></section>
<!-- or -->
<section class="box-flex-content_items_stretch"></section>
```

If you want to set alignment for several items use this class options not with block/container but with child of it - element with class modifier `item`.

```html
<section class="box-flex-items_top">
  <div class="box-flex-item_bottom"></div>
  <div class="box-flex-item_middle"></div>
  <div class="box-flex-item_stretch"></div>
</section>
```

*Items direction*

* `row`, `rowreverse`, `col`, `colreverse`

Use as a class option `direction_{$type}` with special class modifier/option `content` and `items`):

```html
<section class="box-flex-content_items_direction_row"></section>
<!-- or -->
<section class="box-flex-content_items_direction_col"></section>

<!-- of course you can use them together -->
<section class="box-flex-content-items_top-items_direction_col"></section>
```

As a special feature there is defined direction-wrapping flow shorthand.

```html
<section class="box-flex-flow_rowwrap"></section>
```

*Item width*

Except all of that, you also have possibility to set width/sequence of flex box items (`flex` property). By default there is 1-6 sequence iteration, but you can change it by changing `$flex-box-items-sequence-count` variable. After this, set for one of flex box item one of sequence class, like this:

Use as a child of box-flex block with special class midifier `item`:

```html
<!-- simple and regullar order -->
<section class="box-flex">
  <div class="box-flex-item-width_1"></div>
  <div class="box-flex-item-width_2"></div>
  <div class="box-flex-item-width_3"></div>
</section>
<!-- or in the none regullar order -->
<section class="box-flex">
  <div class="box-flex-item-width_4"></div>
  <div class="box-flex-item-width_1"></div>
  <div class="box-flex-item-width_5"></div>
</section>
```

*Item grow/shrink*

Items also can grow and shrink. Use value between 0 to `$flex-box-items-shrink-count` or `$flex-box-items-grow-count` (default: 6) to execute several items growing or shrinking.

Use as a child of box-flex block with special class midifier `item`:

```html
<!-- shrink -->
<section class="box-flex">
  <div class="box-flex-item-shrink_1"></div>
  <div class="box-flex-item-shrink_2"></div>
  <div class="box-flex-item-shrink_1"></div>
</section>
<!-- grow -->
<section class="box-flex">
  <div class="box-flex-item-grow_1"></div>
  <div class="box-flex-item-grow_2"></div>
  <div class="box-flex-item-grow_1"></div>
</section>
<!-- mixed -->
<section class="box-flex">
  <div class="box-flex-item-shrink_4"></div>
  <div class="box-flex-item-grow_2"></div>
  <div class="box-flex-item-shrink_4"></div>
</section>
```

-

More about flexbox layout you will find [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

---

### Collections

TBA

---

### Buttons

Buttons may be one of the most important elements on our project HTML markup. They navigate and supports page actions. That's why we should have very wide variety of customization. Framework will provides many options for buttons such as sizes, colors and positions. Let's dive into them...

Main class model:

```html
<button type="button" class="button">Click me</button>
```

Buttons take over custom font face if it will be defined. But to enable this you have to change one special `$button-text-style` variable from `ragular` to `custom`. By default - if it's defined - buttons will take `$font-base-bold` type face. Have defined other type faces? To set ragular use `regular` class modifier, to use thin use `thin`...

Example:

```html
<button type="button" class="button-regular">Click me</button>
```

Let's move on to sizes.

*Sizes and roundings*

There is main and most important variable to handle button sizes - `$button-size-factor` is responsible for proportion of buttons graduation. If you want to biger or smaller buttons change it. By default there is value of `2`. Button sizes has 6 steps of sizing, but you can increase it by changing `$button-size-iteration` variable.

With button sizes are closely related button proportion types - `panoramic` and `square`. By default we have `panoramic` value, that gives us wider side edges of button. Change `$button-size-proportion` variable to `square` to reach equal proportions.

Except that we have one more size variable that can be customized - `$button-text-size-factor`. This one is responsible for size of text inside the button. It will increase right with the size of button.

Usage:

```html
<button type="button" class="button-size_1">Click me</button>
<button type="button" class="button-size_4">Click me</button>
```

In case of using button roundings we have 6 `border-radius` property scale. Number of rounding iteration can be changed by `$button-rounding-iteration` variable. You can also change rounding size factor - `$button-rounding-factor`.

Usage:

```html
<button type="button" class="button-rounded_1">Click me</button>
<button type="button" class="button-rounded_4">Click me</button>
```
Want to more advanced border radius configuration? Use special `border-radius-unregullar` mixin.

*Colors*

Colors configuration comes with already well known array based structure.

Colors and their names are defined with two special variables: `$button-color-name` and `$button-color-code`. Use predefined colors or feel free to add your owne - keeping in mind the dependence of [array iteration thing](#array-variables).

Usage:

```html
<button type="button" class="button-color_bwhite">Click me</button>
<button type="button" class="button-color_bgrey">Click me</button>
```

There is posibility to reverse button colors and make it more light and flat. To do this use `clear` class option with `color` modifier. In here you have also option to set or remove background for clear buttons - change `$button-clear-background-color` variable to manipulate.

Usage:
```html
<button type="button" class="button-color_bwhite_clear">Click me</button>
```

To put these buttons somewhere use `.actionContainer` element. It has centered `100%` width and it's perfect, relative and worm parent for.

```html
<section class="actionContainer">
  <button type="button" class="button-...">Click me</button>
</section>
```

And least but not last - fitting.

If you want to fit some button to parent box you can use `full` class modifier - comes with `width` and `height` options. These two will set button width on full of it parent. Great for grid/column layout.

Usage:

```html
<button type="button" class="button-full_width">Click me</button>
<button type="button" class="button-full_height">Click me</button>
```
Don't forget about class connection system. That's mean that you can use all of this modifiers and options together and alternately. More abour CCS [here](#classes-syntax-class-connection-structure).

---

### Inputs

In case of inputs we have two class model configuration. One for type text inputs second for textarea's. Both supposed to live in a special form aware markup. In this markup as a parent we have `<fieldset>` element and of course, input inside.

Inputs and textarea's can be scaled just like other elements - by default - from 1-6 size iteration.

Usage:

```html
<fieldset>
  <input class="input_regular-scale_1" type="text"/>
</fieldset>
<!-- or -->
<fieldset>
  <textarea class="textarea-scale_1"></textarea>
</fieldset>
```
As you've noticed input element has also `regular` option. This prevents the adoption of styles from other input type elements. For text input's keep this special class option.

Of course there is posibility to change input color. And just like with other elements there is two variables type array iteration - `$input_text-color-name` and `$input_text-color-code`. Use defined ones or set your own.

Usage:

```html
<fieldset>
  <input class="input-regular-color_bwhite" type="text"/>
</fieldset>
```
Rouned inputs? Use `rounded` modifier to set `border-radius` property for them. Size of rounding is defined with `$input_text-border-radius` variable - by default it's size of `$shift-overall` variable.

For more complex `fieldset` parent setup - i.g. with button - there is special modifier named `type`. Dedicated to two type of situations - one with inline input-button elements and other with block styled...

Usage:

```html
<form>
  <fieldset class="type-inline">
    <input class="input-regular" type="text"/>
    <button class="button" type="post">Send me</button>
  </fieldset>
  <!-- or -->
  <fieldset class="type-blocked">
    ...
  </fieldset>
</form>
```


---

### Resets

TBA

---

### Additionals

TBA

---

### Icons

Icons configuration is moved to special file named `_icons.scss`. If you are using special icons font face you can define and enable it by changing dedicated global variables in `_variables.scss` file. Names, codes, colors and sizes works just like with other elements - more about options interation you will find [here](#array-variables).

Icons should be presented as `<i></i>` HTML element. Icons sign is pinned as a `:before` pseudo class.

Usage:

```html
<i class="icon-message-size_2-color_bwhite"></i>
```

The path for icons font face is the same as for normal custom used font faces. By default: `../font`.

Additionally icons can have strokes. You can enable them by using control variable `$font-icons-stroke`. Change their appearance by changing `$font-icons-stroke-size` and `$font-icons-stroke-color` variables.

---

## Changelog

Go to [changelog file](CHANGELOG.md) to check all recent updates.
