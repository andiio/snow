var debug = require('../../util/debug')('snow:master')
, page
, template = require('./index.html')
, area
, $area
, header
, $top
, $nav

var master = module.exports = function(val, name) {
    if (!$area) {
        throw new Error('master called before render')
    }

    if (val !== undefined) {
        if (page && page.destroy) {
            page.destroy()
        }
        page = val
        $area.html(page.$el)
        master.area(name || null)
    }
    return page
}

master.area = function(name) {
    if (name !== undefined) {
        $nav.find('li').removeClass('active')
        name && $nav.find('.' + name).addClass('active')

        master.$el.removeClasses(/^is-area-/)
        name && master.$el.addClass('is-area-' + name)

        area = name
    }
    return area
}

master.render = function() {
    debug('rendering')

    master.$el = $('body')
    master.$el.prepend(template())

    $area = $('#area')
    header = require('./top')()
    $top = header.$el
    $nav = $top.find('.nav')
    master.$el.find('.top').replaceWith(header.$el)

    return master.$l
}
