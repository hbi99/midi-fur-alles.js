# midi-fur-alles.js
After looking at what is available for playing midi files in the browser, I came to conclusion that there are two variants;
* accelerated by WebAssembly
* ...and pure Javascript

After observing performance differences, I realized the big difference; WebAssembly ones consumed 0.2-0,5 % of the CPU, as oppose to 5-12% with pure Javascript. If one aims to play midi-music for a game, then CPU cycles is precious - hence I focused on WebAssembly accelerated versions.

I found [Timidity](https://github.com/feross/timidity) but noticed quickly that the code contains a lot of stuff that is useless for me. Since Timidity library is MIT licensed, I decided to alter it and remove the stuff I don't need - in order to reduce the library file size. The resulting minified version is 18kB (23kB wasm) gzip'ed files.

This library is totaly adjusted and slimmed down for my needs - it might suit others needs as well so...enjoy :-)

## How to use
Usage is as simple as examplified below. One thing to have in mind is that audio songs are not allowed unless preceived by user interaction...read about it [here](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes).
```js
let player = new MidiFurAlles();
player.load("The-Entertainer.mid");
player.play();
```

To test it locally:
```
$ git clone https://github.com/hbi99/midi-fur-alles.js.git
$ cd midi-fur-alles.js
$ npm install
$ npm run test
```
...and browse http://localhost:4100/index.htm

## Interface

### `player.load(urlOrBuf)`
This function loads the specified MIDI file `urlOrBuf`, which is a `string` path
to the MIDI file or a `Uint8Array` which contains the MIDI file data.

This should be the first function called on a new `Timidity` instance.

### `player.play()`
Plays the currently loaded MIDI file.

### `player.pause()`
Pauses the currently loaded MIDI file.

### `player.seek(seconds)`
Seeks to a specified time in the MIDI file.

If the player is paused when the function is called, it will remain paused. If
the function is called from another state (playing, etc.), the player will
continue playing.

### `player.duration`
Returns the duration in seconds (`number`) of the currently playing MIDI file.
Note that `duration` will return `0` until the file is loaded, which normally
happens just before the `playing` event.

### `player.currentTime`
Returns the elapsed time in seconds since the MIDI file started playing.

### `player.destroy()`
Destroys the entire player instance, stops the current MIDI file from playing,
cleans up all resources.

Note: It's best to reuse the same player instance for as long as possible. It is
not recommended to call `player.destroy()` to stop or change MIDI files. Rather,
just call `player.pause()` to pause or `player.load()` to load a new MIDI file.

### `player.on('error', (err) => {})`
This event fires if a fatal error occurs in the player, including if a MIDI file
is unable to be played.

### `player.on('timeupdate', (seconds) => {})`
This event fires when the time indicated by the `currentTime` property has been
updated.

### `player.on('ended', () => {})`
This event fires when a MIDI file has played until the end.

### `player.on('playing', () => {})`
This event fires when a MIDI file starts playing.

### `player.on('paused', () => {})`
This event fires when a MIDI file is paused.
