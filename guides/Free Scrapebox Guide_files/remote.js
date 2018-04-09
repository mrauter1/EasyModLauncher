(function (root, factory) {
    if (typeof root.__berush !== 'undefined') return;
    root.__berush = factory();
})(this, function () {

    var ROOT_NOE = '.berush-root';
    var SCRIPT_NOE = '#berush-widget';
    var IFRAME_SRC_TEMPLATE = '//{host}/widget-iframe?ref={ref}&db={db}&color={color}';

    var Berush = function () {
        this.initialize();
    };

    Berush.prototype.initialize = function () {
        var nodeList = document.querySelectorAll(ROOT_NOE);
        for (var i = 0; i < nodeList.length; ++i) {
            this.renderIframe(nodeList[i]);
        }
    };

    Berush.prototype.refresh = function () {
        this.initialize();
    };

    Berush.prototype.createIframe = function (data) {
        var iframe = document.createElement('iframe');

        iframe.src = this.template(IFRAME_SRC_TEMPLATE, data);

        /* START reset */
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('scrolling', 0);
        /* END reset */

        iframe.style.minWidth = '270px';
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '79px');

        return iframe;
    };

    Berush.prototype.renderIframe = function (node) {
        var iframe = this.createIframe({
            'host': this.createLink(document.querySelector(SCRIPT_NOE).src).host,
            'ref': node.getAttribute('data-ref'),
            'db': node.getAttribute('data-db'),
            'color': node.getAttribute('data-color')
        });
        node.parentNode.replaceChild(iframe, node);
        return iframe;
    };

    Berush.prototype.createLink = function (url) {
        var link = document.createElement('a');
        link.href = url;
        return url ? link : {};
    };

    Berush.prototype.template = function (tmpl, context, filter) {
        context = typeof context == 'undefined' ? {} : context;
        return tmpl.replace(/\{([^\}]+)\}/g, function (m, key) {
            // If key doesn't exists in the context we should keep template tag as is
            return context.hasOwnProperty(key) ? (filter ? filter(context[key]) : context[key]) : m;
        });
    };

    return new Berush();
});