# EZGesture(~1KB Gzipped)
![npm (tag)](https://img.shields.io/npm/v/ezgesture) ![GitHub](https://img.shields.io/github/license/mhmd-22/ezgesture)

Easily add gestures functionality with simple native DOM events


- [EZGesture(~1KB Gzipped)](#ezgesture1kb-gzipped)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Usage](#usage)
    - [Drag Events](#drag-events)
    - [Pinch Events](#pinch-events)
    - [`ezgpinchstart`](#ezgpinchstart)
    - [`ezgpinchmove`](#ezgpinchmove)
    - [`ezgpinchend`](#ezgpinchend)
    - [Longpress Events](#longpress-events)
  - [Integration with other frameworks](#integration-with-other-frameworks)
    - [Svelte](#svelte)
  - [Browser Support](#browser-support)


## Installation
**NPM**
`npm i ezgesture`

**CDN:**

```html
<!-- Full bundle -->
<script src="https://cdn.jsdelivr.net/npm/ezgesture@1.1.0/dist/index.min.js"></script>
<!-- Drag only -->
<script src="https://cdn.jsdelivr.net/npm/ezgesture@1.1.0/dist/drag.min.js"></script>
<!-- Pinch only -->
<script src="https://cdn.jsdelivr.net/npm/ezgesture@1.1.0/dist/pinch.min.js"></script>
<!-- Longpress only -->
<script src="https://cdn.jsdelivr.net/npm/ezgesture@1.1.0/dist/longpress.min.js"></script>
```


## Quick Start
```javascript

// drag events
EZG.enableDragEvents(elm)
elm.addEventListener("ezgdragstart", onDragStart)
elm.addEventListener("ezgdragmove", onDragMove)
elm.addEventListener("ezgdragstop", onDragMove)

// pinch events
EZG.enablePinchEvents(elm)
elm.addEventListener("ezgpinchstart", onPinchStart)
elm.addEventListener("ezgpinchmove", onPinchMove)
elm.addEventListener("ezgpinchend", onPinchEnd)

// longpress events
EZG.enableLongPressEvents(elm, {duration: 700})
elm.addEventListener("ezglongpress", onLongPress)
```
[Full Demo](https://mhmd-22.github.io/ezgesture/)

Source code available in [demos folder](demos/)




## Usage
### Drag Events
To enable drag events:
```javascript
EZG.enableDragEvent(elm, options?)
```

You can also supply `threshold` in options to set minimum distance to trigger events

**Events**
- `ezgdragstart` - cancelable with `e.preventDefault()`
- `ezgdragmove` - cancelable. will stop calculating last offset.
- `ezgdragend`


**Events paramters:**
Use `e.detail` to access these event paramaters:
```javascript

// Initial drag position
startX, startY

// Last drag position
lastX, lastY

// Mouse delta from initial drag position
offsetX, offsetY

// Mouse delta from last mouse position
movementX, movementY

// it can be Touch or Mouse Event
// so you could use properties like ctrlKey or altKey
originalEvent
```

### Pinch Events

To enable pinch events:
```javascript
EZG.enablePinchEvent(elm, options?)
```

Available options:
* `distanceThreshold`: minimum distance to trigger event
* `angleThreshold`: minimum angle(radians)

### `ezgpinchstart`
**cancelable**: Yes, with `e.preventDefault()`


**paramaters**:
```javascript
startTouches
originalEvent
```

### `ezgpinchmove`
**cancelable**: Yes, It will stop calculating `lastXXX` paramaters such as `lastOffset` and `lastDist`

**paramaters**:
* `dx, dy`: difference between the two touches
* `da`: angle difference from last movement
* `dist`: distance between two fingers
* `offset`: distance difference from last touch
* `angle`: angle between two fingers (radians)
* `midX, midY`: center position of two fingers
* `dir`: direction of the pinch. -1=pinch in, 1=out, 0=no direction change
* `startTouches`
* `lastTouches`
* `lastOffset`
* `lastDist`
* `lastAngle`

### `ezgpinchend`
**cancelable**: No

**paramaters**:
* `startTouches`
* `lastTouches`
* `lastOffset`
* `lastDist`
* `lastAngle`

### Longpress Events

To enable longpress events:
```javascript
EZG.enableLongPressEvents(elm, {duration: ms})
```
The default duration is `700ms`. and it has only one parameter `originalEvent`

## Integration with other frameworks

### Svelte
You could also listen to this event with framework that uses native dom events. For example in svelte you could use:

```svelte
<div use:enablePinchEvents={{options}} on:ezgpinchmove={onPinch}></div>
```

[Example](https://svelte.dev/repl/e426f80d0f31427f85943e11ad337a36?version=3.37.0)

## Browser Support
Should support most of latest 5 years browsers. if you want more support you could through polyfills

