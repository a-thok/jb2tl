(function () {
  var phonetics = document.getElementsByTagName('b');
  phonetics = Array.prototype.slice.call(phonetics);

  var jb = [1, 3, 5, 7, 2, 4, 6, 8, 0];
  var tl = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  phonetics.forEach((phonetic) => {
    phonetic.innerHTML = phonetic.innerHTML.
      // 声母
      replace(/^p/, 'ph').
      replace(/^t/, 'th').
      replace(/^k/, 'kh').
      replace(/^b/, 'p').
      replace(/^d/, 't').
      replace(/^g/, 'k').
      replace(/^m/, 'b').
      replace(/^ng(\w)/, function (s, $1) { return 'g' + $1; }).
      replace(/^z/, 'ts').
      replace(/^c/, 'tsh').
      // 韵母
      replace('eng', 'ng').
      replace('ao', 'au').
      replace('e', 'er').
      replace('ê', 'e').
      replace('y', 'ir').
      replace(/o(<\/[^u])/, function (s, $1) { return 'oo' + $1; }).
      replace('ou', 'o').
      // 鼻化韵
      replace(/<u>(\w+)<\/u>/, function (s, $1) { return $1 + 'nn'; }).
      // 鼻化声母
      replace(/(b|l|g)(\w*)(ng|nn)/, function (s, $1, $2, $3) {
        var initial;
        if ($1 === 'b') {
          initial = 'm';
        } else if ($1 === 'l') {
          initial = 'n';
        } else {
          initial = 'ng';
        }
        var ending = $3 === 'ng' ? $3 : '';
        return initial + $2 + ending;
      })
      // 声调
      .replace(/(\w)(<sup>)(\d)/, function (s, $1, $2, $3) {
        var index = jb.indexOf(+$3);
        var ending = '';
        if (index === 3 || index === 7) {
          if ($1 !== 'p' && $1 !== 't' && $1 !== 'k') {
            ending = 'h'
          }
        }
        return $1 + ending + $2 + tl[index];
      });
  });
}());
