(function() {
  var input = document.createElement("input"); "<input id=\"image-input\" type=\"file\" multiple=\"false\" accept=\"image/*\">"
  input.setAttribute("id", "image-input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", "false");
  input.setAttribute("accept", "image/*");

  var canvasDiv = document.getElementById("canvas_canvas");
  canvasDiv.appendChild(input);
  canvasDiv.insertBefore(input, canvasDiv.childNodes[0])

  document.getElementById("sav").style.marginLeft = "-250px";

  var imgLoader = document.getElementById("image-input");
  imgLoader.addEventListener("change", handleImg, false);
  var canvas = document.getElementById("test");
  var ctx = canvas.getContext("2d");

  function handleImg(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
})();
