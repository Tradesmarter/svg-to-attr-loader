import jsdom from 'jsdom';

module.exports = function(source) {
  this.cacheable();
  const cb = this.async();
  jsdom.env(source, (err, window) => {
    if (err) {
      return cb(err);
    }

    const result = JSON.stringify(Array.from(window.document.getElementsByTagName('path'))
      .map((element) => element.getAttribute('d')));

    cb(null, `module.exports = ${result};`);
  })
}
