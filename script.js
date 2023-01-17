/*NPM's page like copy to clipboard(ctc)
for more info about (ctc) :

https://developer.mozilla.org/en-US/docs/Web/API/Selection/addRange

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard*/

const selectable = document.querySelector('[data-ctc]');
selectable.addEventListener('click', ctc);
selectable.addEventListener('mouseenter', ctc);
selectable.addEventListener('mouseleave', deSelect);

//Clean everything that already selected
function deSelect() {
  document.getSelection().removeAllRanges();
}

//Main functionality
function ctc(event) {
  let selection = window.getSelection();
  let target = document.getElementsByTagName(event.target.tagName);
  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
  for (let i = 0; i < target.length; i++) {
    let range = document.createRange();
    range.selectNode(target[i]);
    selection.addRange(range);
  }
  if (event.type == "click" && event.detail < 2) {
    topbar.show()
    //Native JS copy to clipboard
    document.execCommand("copy");
    // if single clicked show flash message
  setTimeout(() => {
    flash()
  }, 1000);
  }
}

//Simple Flash message
function flash() {
      topbar.hide()
  let body = document.querySelector("body");
  body.classList.add("special");
  setTimeout(() => {
    body.classList.remove("special");
  }, 2000);
}
  function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}