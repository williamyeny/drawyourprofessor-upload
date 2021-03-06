(function() {
  var canvas = document.getElementById("test");
  var ctx = canvas.getContext("2d");
  var img;
  
  var input = document.createElement("input"); "<input id=\"image-input\" style=\"width:200px\" type=\"file\" multiple=\"false\" accept=\"image/*\">"
  input.setAttribute("id", "image-input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", "false");
  input.setAttribute("accept", "image/*");
  input.setAttribute("style", "width:200px;");

  var button = document.createElement("button");
  var buttonText = document.createTextNode("Re-paste Image");
  button.setAttribute("id", "repaste-image");
  button.appendChild(buttonText);

  var canvasDiv = document.getElementById("canvas_canvas");
  canvasDiv.appendChild(button);
  canvasDiv.insertBefore(button, canvasDiv.childNodes[0])
  canvasDiv.appendChild(input);
  canvasDiv.insertBefore(input, canvasDiv.childNodes[0]);

  document.getElementById("sav").style.marginLeft = "-250px";
  document.getElementById("sav").style.marginTop = "600px";

  input.addEventListener("change",   function(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      img = new Image();
      img.onload = function() {
        drawImageProp(ctx, img);
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }, false);

  button.addEventListener("click", function() {
    drawImageProp(ctx, img);
  })

  /**
   * By Ken Fyrstenberg Nilsen
   *
   * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
   *
   * If image and context are only arguments rectangle will equal canvas
  */
  function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }
})();
