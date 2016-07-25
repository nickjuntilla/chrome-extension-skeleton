var mouseX, mouseY;

document.onmousemove = function(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
};


var addElement = function (url) {
  // create a new div element
  // and give it some content
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id", "googler-window");
  newDiv.style.top = mouseY + 'px';
  newDiv.style.left = mouseX + 'px';

  var googleFrame = document.createElement("iframe");
  googleFrame.setAttribute("src", url);
  googleFrame.onload = function() {
    googleFrame.contentWindow.scrollTo(100, 150);
  };
  newDiv.appendChild(googleFrame);

  var close = document.createElement("button");
  newDiv.appendChild(close);
  close.onclick = function () {
    newDiv.remove();
  };

  document.body.appendChild(newDiv);
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.searchURL) {
      sendResponse({farewell: "goodbye"});
      addElement(request.searchURL);
    } else {
      console.log("Bad message: no greeting");
    }
  });
