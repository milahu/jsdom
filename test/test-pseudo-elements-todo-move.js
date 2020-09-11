const jsd = require('../lib/api');

const styleObj = {
  display: 'block', // default
  content: '" world"',
  color: "blue",
  visibility: 'visible', // default
}

const styleStr = Object.keys(styleObj)
.reduce((acc, key) => {
  acc += `${key}: ${styleObj[key]}; `;
  return acc;
}, '');

const o = new jsd.JSDOM(`
  <html>
    <head>
      <style>
        div::after{${styleStr}}
      </style>
    </head>
    <body>
      <div style="color:red">hello</div>
    </body>
  </html>
`);

const e = o.window.document.querySelector('body>div');
const s = o.window.getComputedStyle(e, '::after');

console.log('getComputedStyle._values:');
console.dir(s._values);
console.log('should be:');
console.dir(styleObj);
