var minTurnipPrice = 300;
var maxTurnipPrice = 110;
var maxQueued = localStorage["queued"] == "true" ? 100 : 0;
var onlyTagged = localStorage["tag"] == "true" ? true : false;
var mode = localStorage["buy"] == "true" ? 1 : 0;
var modes = ["buying", "selling"];
var watch = localStorage["watch"] == "true" ? 10 : 0;
var data = [];
var notify = localStorage["notify"] == "true" ? true : false;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const yourFunction = async () => {
  await delay(1000);
  loadData();
  for (var x = 14; x > 0; x--) {
    //document.querySelector("#seg").innerHTML = "Refresh: " + x;
    await delay(1000);
  }
  yourFunction();
};

function loadData() {
  fetch("https://api.turnip.exchange/islands/")
    .then((response) => response.json()) // parse the JSON from the server
    .then((d) => {
      if (d.islands[0].name != "error") {
        if (document.location.pathname === "/islands") {
          change(d.islands);
        }
        data = d.islands;
      }
    });
}

async function change(a) {
  document.querySelector(
    ".col-start-2"
  ).innerHTML = "";
  a
    .filter((x) => x.turnipPrice != 0)
    .filter((x) => (onlyTagged ? x.commerce == modes[mode] : x))
    .filter((x) => (maxQueued == 0 ? x : x.queued < maxQueued))
    .sort(function (a, b) {
      if (mode) {
        if (a.turnipPrice > b.turnipPrice) {
          return 1;
        }
        if (b.turnipPrice > a.turnipPrice) {
          return -1;
        }
      } else {
        if (a.turnipPrice > b.turnipPrice) {
          return -1;
        }
        if (b.turnipPrice > a.turnipPrice) {
          return 1;
        }
      }
      return 0;
    }).forEach((element, key) => {
      if (watch == 0 ? true : (key < watch)) {
        document.querySelector(
          ".col-start-2"
        ).innerHTML += `<div data-v-e6f7a72c="" data-turnip-code="${
          element.turnipCode
          }" class="note relative bg-background items-center select-none w-56 sm:w-64 pb-4"><img data-v-e6f7a72c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAArCAYAAAA65tviAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQxQzFERTY2NzFGMTFFQThFMEY4MTcwNTEwRDI2NzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQxQzFERTc2NzFGMTFFQThFMEY4MTcwNTEwRDI2NzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NUJFQ0EwOTY3MUYxMUVBOEUwRjgxNzA1MTBEMjY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NUJFQ0EwQTY3MUYxMUVBOEUwRjgxNzA1MTBEMjY3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlnziekAAAs9SURBVHjaxFpb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" class="pin object-scale-down relative w-12" style="top: -0.870895em; left: -0.640489rem;"><div data-v-e6f7a72c="" class="flex flex-col justify-center">
          ${element.commerce != "neither" ? '<p data-v-e6f7a72c="" title="Buying" class="absolute top-0 right-0 ml-2 text-xs self-start p-1 text-background ' + (element.commerce == 'buying' ? 'bg-connected' : 'bg-alert') + '">' + (element.commerce == 'buying' ? 'buy' : 'sell') + '</p>' : ''}
          <h2 data-v-e6f7a72c="" class="text-center font-poster text-2xl md:text-4xl leading-9">${
          element.name
          }</h2><div data-v-e6f7a72c="" class="text-xs justify-self-end col-span-6 row-start-2">${
          element.islandTime
          }</div></div><div data-v-e6f7a72c="" class="p-4 self-start flex flex-row items-center"><img data-v-e6f7a72c="" src="/assets/images/fruits/${
          element.fruit
          }.png" class="w-6 ml-2 object-scale-down"><div data-v-e6f7a72c="" class="text-foreground-25a mx-2 justify-self-center"> | </div><div data-v-e6f7a72c="" class="flex flex-row items-center justify-self-center"><img data-v-e6f7a72c="" src="/img/turnip.0cf2478d.png" class="w-6 object-scale-down"><p data-v-e6f7a72c="" class="ml-2">${
          element.turnipPrice
          } Bells</p></div><div data-v-e6f7a72c="" class="text-foreground-25a mx-2 justify-self-center">|</div><p data-v-e6f7a72c="" class="capitalize justify-self-center">${
          element.hemisphere
          }</p></div><p data-v-e6f7a72c="" class="text-xs p-4 pt-0 justify-self-start overflow-hidden" style="max-height: 10rem; max-width: 98%;">${
          element.description
          }</p><p data-v-e6f7a72c="" class="text-xs italic px-4 justify-self-end"> Waiting: ${
          element.queued
          }</p></div>`;
      }
    });
}

yourFunction();

var port = chrome.runtime.connect();
port.onMessage.addListener(async function (msg) {
  localStorage.setItem(msg[0], msg[1]);
  switch (msg[0]) {
    case "tag":
      onlyTagged = msg[1];
      break;
    case "buy":
      mode = msg[1] ? 1 : 0;
      break;
    case "queued":
      maxQueued = msg[1] ? 100 : 0;
      break;
    case "watch":
      watch = msg[1] ? 10 : 0;
      break;
    case "notify":
      console.log("notify::" + msg[1]);
      break;
  }

  change(data);
});
if (localStorage["zxc"] == undefined) {
  localStorage.setItem("tag", true);
  localStorage.setItem("buy", true);
  localStorage.setItem("queued", true);
  localStorage.setItem("watch", true);
  localStorage.setItem("zxc", true);
}