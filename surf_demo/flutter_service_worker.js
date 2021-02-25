'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/asset/font/play.ttf": "c73c657d9968df74e71d70bc94cf6fca",
"assets/asset/font/zelek.ttf": "96994f5c41ba836fb5c8bd109a9af4c4",
"assets/asset/icon/briefcase.svg": "94ec36dc45cff32a1163fee5dae55dbf",
"assets/asset/icon/exp.svg": "32a0133e1cbae7085bbed0d106b26b48",
"assets/asset/icon/main_head.svg": "7c1f3b44bd3ecc18bf2ef3d1cc35b037",
"assets/asset/icon/medal.svg": "dbe9fec9844206da88ebb88a4f19d4b4",
"assets/asset/icon/message.svg": "acc8001f3afae8b59bd1a9045ccbf41e",
"assets/asset/icon/resume.svg": "2a6e83808e0b1c7f4c6e8efe40a0145c",
"assets/asset/icon/sert.svg": "7b464d208b2a9ea85d4a1c1bb4b9df68",
"assets/asset/icon/skill_0.svg": "2d27a69601201f15552a3cc7522dbca3",
"assets/asset/icon/skill_1.svg": "a2ab8c9e65604274042c5cbef777aca7",
"assets/asset/icon/skill_2.svg": "6920458e268b103c11364493ead39088",
"assets/asset/icon/skill_3.svg": "0f801a2e407e88f89b904aade44a4c13",
"assets/asset/icon/skill_4.svg": "a0b21e3e5f3cf8c6366895dabd850203",
"assets/asset/icon/skill_5.svg": "b8e0e5c92d237c889bfb2c8e2cf865c8",
"assets/asset/icon/src.svg": "106f93e0f39e64ebc479fe334ba9a0f4",
"assets/asset/icon/surflogo_gear.svg": "fa43bc3a5da8bd49a53581a09a5d7a3b",
"assets/asset/icon/surflogo_text.svg": "fcf25b32ca7bc68075db7dd93cd58f5c",
"assets/asset/icon/time.svg": "d950ef68d85c0c9aaceb50a6bbc31aeb",
"assets/asset/image/4step.gif": "e79a39fdb07153250ff02cc14036e6ce",
"assets/asset/image/btn_back.jpg": "77b1d0ab1c31abfe3cf8c3f013486651",
"assets/asset/image/btn_back.png": "636f5ef74e94ad7330d6b54775d1382f",
"assets/asset/image/btn_back_05.png": "a2989f09ae3cd9d5d4c56250e84797e8",
"assets/asset/image/is_3.png": "b345aa99b5baa1e77d8e14e136e75ec6",
"assets/asset/image/logo_0.png": "2379affd6a68e153fec3e996b782c8fb",
"assets/asset/image/ls.webp": "4bf5fd3f2cb98db4b918dac9fe30bd21",
"assets/asset/image/ls_2.webp": "95f22410c7ec13a8e9f35545a9980206",
"assets/asset/image/mentor_0.webp": "b910b437fcb70946f9505881ca65a98f",
"assets/asset/image/mentor_1.webp": "d26e8b209145d71beb2a6836020e55d5",
"assets/asset/image/mentor_2.webp": "1be244a96dd95c1e25b453ed03b1aa50",
"assets/AssetManifest.json": "21dc45aed1a7ea639231dbeaa6ef1fcf",
"assets/FontManifest.json": "69c67339b252549dc8dc3f0b72a81559",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "25a66ff5e49ae44facb990da2b09b618",
"assets/packages/flutter_inappwebview/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/youtube_player_flutter/assets/speedometer.webp": "50448630e948b5b3998ae5a5d112622b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "aec6235f4721108e3dc28c1903024072",
"/": "aec6235f4721108e3dc28c1903024072",
"main.dart.js": "c3236f2b6732b2c2d1030c437209307e",
"manifest.json": "16a6e720436ab70c5f32a186a7fcd342",
"version.json": "d2c10a0d953cccc16c26d110f1f82c0f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
