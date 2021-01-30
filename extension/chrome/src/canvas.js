const settingsList = ["canvasplus-setting-search", "canvasplus-setting-smartscroll"];
let settings = {};

chrome.storage.local.get(settingsList, function(data) {
  settings = data;
  if(Object.entries(data).length < settingsList.length)
  {
    window.open("https://canvasplus.adrwas.dev/");
    chrome.storage.local.set({"canvasplus-setting-search": true, "canvasplus-setting-smartscroll": true});
  }
});

window.addEventListener('focus', function () {
  checkSettingsChange();
});

function checkSettingsChange() {
  chrome.storage.local.get(settingsList, function(data) {
    if(JSON.stringify(settings) != JSON.stringify(data)){
      alert.style.opacity = "1";
      alert.style.visibility = "visible";
      settings = data;
    }
  })
}

let alert = document.createElement("div");
alert.id = "canvasplus-alert";
alert.style.opacity = "0";
alert.style.visibility = "hidden";
alert.addEventListener("click", function (evt) {
  if (evt.target !== this)
    return;

  this.style.opacity = "0";
  this.style.visibility = "hidden";
});

let settingsUpdateBox = document.createElement("div");
settingsUpdateBox.id = "canvasplus-alert-settings-update"
settingsUpdateBox.innerHTML = "<h2>Canvas+ Settings were Changed</h2><p>Your changes will be applied once this page is reloaded.</p><br><button class='btn' onclick='location.reload()'>Reload</button>"

alert.appendChild(settingsUpdateBox);
document.body.insertBefore(alert, document.body.firstElementChild);