document.querySelectorAll("input[type=checkbox]").forEach(element => {
  element.onclick = function (e) {
    localStorage.setItem(e.target.id, e.target.checked);
    send([e.target.id, e.target.checked]);
  };
});
function send(msg) {
  chrome.runtime.sendMessage(msg);
}
if (localStorage["zxc"] == undefined) {
  localStorage.setItem("tag", true);
  localStorage.setItem("buy", true);
  localStorage.setItem("queued", true);
  localStorage.setItem("watch", true);
  localStorage.setItem("zxc", true);
}
["queued", "watch", "buy", "tag"].forEach(x => {
  document.querySelector("input[type=checkbox]#" + x).checked = localStorage[x] == "true" ? true : false;
});
