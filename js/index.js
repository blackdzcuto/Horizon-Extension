window.onload = function () {
  document.getElementById("ExpApp").addEventListener("click", function () {
    chrome.cookies.getAll({
      domain: "facebook.com"
    }, function (b) {
      b = b.map(function (a) {
        return {
          key: a.name,
          value: a.value,
          domain: "facebook.com",
          path: a.path,
          hostOnly: a.hostOnly,
          creation: new Date().toISOString(),
          lastAccessed: new Date().toISOString()
        };
      });
      b = JSON.stringify(b, null, 4);
      var d = document.createElement("input");
      document.body.appendChild(d);
      d.value = b;
      d.select();
      document.execCommand("copy");
      document.body.removeChild(d);
      alert("Copy AppState Success!");
    });
  });
};
