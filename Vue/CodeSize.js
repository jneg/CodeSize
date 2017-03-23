Vue.component('Inscription', {
  'template': '<h1 class="title is-2">{{title}}</h1>',
  'props': ['title']
});

Vue.component('LineResults', {
  'template': '<div>\
    <div>Total Lines: {{lines}}</div>\
    <div>Glyph Lines: {{glines}}</div>\
    <div>Whitespace Lines: {{wlines}}</div>\
    </div>',
  'props': ['lines', 'glines'],
  'computed': {
    'wlines': function () {
      return this.lines - this.glines;
    }
  }
});

Vue.component('CharResults', {
  'template': '<div>\
    <div>Total Characters: {{chars}}</div>\
    <div>Glyph Characters: {{gchars}}</div>\
    <div>Whitespace Characters: {{wchars}}</div>\
    </div>',
  'props': ['chars', 'gchars'],
  'computed': {
    'wchars': function () {
      return this.chars - this.gchars;
    }
  }
});

Vue.component('TimeResults', {
  'template': '<div>At {{cps}} Characters per Second, it would take {{seconds}} seconds to retype this code!</div>',
  'props': ['cps', 'seconds']
});

Vue.component('Controller', {
  'template': '<main class="container is-fluid">\
    <Inscription title="Code Size"/>\
    <textarea v-model="code" class="textarea"></textarea>\
    <LineResults :lines="lines" :glines="glines"/>\
    <CharResults :chars="chars" :gchars="gchars"/>\
    <TimeResults :cps="cps" :seconds="seconds"/>\
    </main>',
  'data': function () {
    return {
      'code': ''
    };
  },
  'computed': {
    'lines': function () {
      return this.code.split(/\n/).length;
    },
    'glines': function () {
      return this.code.split(/\n/).filter(function (e) {return e !== ''}).length;
    },
    'chars': function () {
      return this.code.length;
    },
    'gchars': function () {
      return this.code.replace(/\s/g, '').length;
    },
    'seconds': function () {
      return this.chars / this.cps;
    },
    'cps': function () {
      return 5;
    }
  }
});

new Vue({
  'el': '#Mount',
  'template': '<Controller/>'
});
