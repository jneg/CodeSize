Vue.component('Inscription', {
  'template':
   '<div class="ui basic padded center aligned segment" style="background-color:#06D6A0;">\
      <h1 class="ui header" style="color:#FFFFFF;">{{title}}</h1>\
    </div>',
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
        <div class="label">Seconds to Retype\
      </div>\
    </div>',
  'props': ['cps', 'seconds']
})

Vue.component('ClassResults', {
  'template':
   '<div>\
      <div class="ui small violet statistic">\
        <div class="value">{{codeclass}}</div>\
        <div class="label">Code Class\
      </div>\
    </div>',
  'props': ['codeclass']
})

Vue.component('Controller', {
  'template':
   '<main>\
      <Inscription title="Code Size"/>\
      <div class="ui basic padded segment">\
        <textarea v-model="code" rows="25" style="width:100%;font-family:monospace"></textarea>\
        <div class="ui basic padded segment">\
          <div class="ui grid">\
            <div class="eight wide center aligned column">\
              <LineResults :tlines="tlines" :glines="glines" :wlines="wlines"/>\
            </div>\
            <div class="eight wide center aligned column">\
              <CharResults :tchars="tchars" :gchars="gchars" :wchars="wchars"/>\
            </div>\
            <div class="eight wide center aligned column">\
              <TimeResults :cps="cps" :seconds="seconds"/>\
            </div>\
            <div class="eight wide center aligned column">\
              <ClassResults :codeclass="codeclass"/>\
            </div>\
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
    },
    'codeclass': function () {
      if (this.gchars > 100000) return 'Astronomical'
      if (this.gchars > 20000) return 'Mammoth'
      if (this.gchars > 5000) return 'Jumbo'
      if (this.gchars > 2000) return 'Modest'
      if (this.gchars > 1000) return 'Little'
      if (this.gchars > 500) return 'Compact'
      if (this.gchars > 200) return 'Mini'
      return 'Microscopic'
    }
  }
})

new Vue({
  'el': '#Mount',
  'template': '<Controller/>'
})
