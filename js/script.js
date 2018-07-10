var lightness = 0.95; // HSL lightness for bright pastels
var saturation = 1; // pastels are 100% saturated and we want bright
var hue = Math.random(); // randomize color hue (degrees)

var hex = hslToHex(hue, saturation, lightness); // translate to hex
document.body.style.backgroundColor = hex; // set color
document.getElementById('text').innerText = hex; // set text

// copy on click
var textElem = document.getElementById('text');
textElem.addEventListener('click', function() {
  var copy = document.getElementById('clock-copy');
  copy.innerHTML = textElem.innerHTML;
  copy.style.visibility = 'visible';
  copy.focus();
  copy.select();

  try {
    document.execCommand('copy');
    textElem.classList.add('copied');
  } catch (e) {}
  copy.style.visibility = 'hidden';
});

// setup clock
var clockElem = document.getElementById('clock');
updateClock();
setInterval(function() { updateClock(); }, 500);

function updateClock() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ampm = h >= 12 ? '오후' : '오전';
  h = h % 12; // 24 hr -> 12hr
  h = (h === 0) ? 12 : h; // hour 0 we call 12

  clockElem.innerHTML =
    '<span class="ampm">' + ampm + '</span>'
    + ' ' + h + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
}


// https://stackoverflow.com/a/44134328
// h,s,l are in the set [0, 1]
// (hue = degrees / 360)
function hslToHex(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  var toHex = function(x){
    var hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}