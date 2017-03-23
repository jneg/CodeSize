Vue.component('Inscription', {
  'template': '<h1 class="ui center aligned header">{{title}}</h1>',
  'props': ['title']
})

Vue.component('LineResults', {
  'template':
  '<div>\
     <div class="ui small yellow statistic">\
       <div class="value">{{tlines}}</div>\
       <div class="label">Total Lines</div>\
     </div>\
     <div class="ui small yellow statistic">\
       <div class="value">{{glines}}</div>\
       <div class="label">Glyph Lines</div>\
     </div>\
     <div class="ui small yellow statistic">\
       <div class="value">{{wlines}}</div>\
       <div class="label">Whitespace Lines</div>\
     </div>\
   </div>',
  'props': ['tlines', 'glines', 'wlines']
})

Vue.component('CharResults', {
  'template':
   '<div>\
      <div class="ui small teal statistic">\
        <div class="value">{{tchars}}</div>\
        <div class="label">Total Chars</div>\
      </div>\
      <div class="ui small teal statistic">\
        <div class="value">{{gchars}}</div>\
        <div class="label">Glyph Chars</div>\
      </div>\
      <div class="ui small teal statistic">\
        <div class="value">{{wchars}}</div>\
        <div class="label">Whitespace Chars</div>\
      </div>\
    </div>',
  'props': ['tchars', 'gchars', 'wchars']
})

Vue.component('TimeResults', {
  'template':
   '<div>\
      <div class="ui small brown statistic">\
        <div class="value">{{cps}}</div>\
        <div class="label">Chars per Second</div>\
      </div>\
      <div class="ui small brown statistic">\
        <div class="value">{{seconds}}</div>\
        <div class="label">seconds to retype\
      </div>\
    </div>',
  'props': ['cps', 'seconds']
})

Vue.component('Controller', {
  'template':
   '<div class="basic ui segment">\
     <div class="ui fluid container">\
        <Inscription title="Code Size"/>\
        <textarea v-model="code" rows="30" style="width:100%;font-family:monospace"></textarea>\
        <div class="ui grid">\
          <div class="five wide center aligned column">\
            <LineResults :tlines="tlines" :glines="glines" :wlines="wlines"/>\
          </div>\
          <div class="six wide center aligned column">\
            <CharResults :tchars="tchars" :gchars="gchars" :wchars="wchars"/>\
          </div>\
          <div class="five wide center aligned column">\
            <TimeResults :cps="cps" :seconds="seconds"/>\
          </div>\
        </div>\
      </div>\
    </main>',
  'data': function () {
    return {
      'code': ''
    }
  },
  'computed': {
    'lines': function () {
      return this.code.split(/\n/)
    },
    'tlines': function () {
      return this.lines.length
    },
    'glines': function () {
      return this.lines.filter(function (e) {return e != ''}).length
    },
    'wlines': function () {
      return this.tlines - this.glines
    },
    'tchars': function () {
      return this.code.length
    },
    'gchars': function () {
      return this.code.replace(/\s/g, '').length
    },
    'wchars': function () {
      return this.tchars - this.gchars
    },
    'seconds': function () {
      return this.tchars / this.cps
    },
    'cps': function () {
      return 5
    }
  }
})

new Vue({
  'el': '#Mount',
  'template': '<Controller/>'
})
