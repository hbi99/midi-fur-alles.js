# midi-fur-alles.js
After looking at what is available for playing midi files in the browser, I came to conclusion that there are two variants;
* accelerated by WebAssembly
* ...and pure Javascript

After observing performance differences, I realized the big difference; WebAssembly ones consumed 0.2-0,5 % of the CPU, as oppose to 5-12% with pure Javascript. If one aims to play midi-music for a game, then CPU cycles is precious - hence I focused on WebAssembly accelerated versions.

I found [Timidity](https://github.com/feross/timidity) but noticed quickly that the code contains a lot of stuff that is useless for me. Since Timidity library is MIT licensed, I decided to alter it and remove the stuff I don't need - in order to reduce the library file size. The resulting minified version is 18kB (23kB wasm) gzip'ed files.

This library is totaly adjusted and slimmed down for my needs - it might suit others needs as well so...enjoy :-)

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
