/**
 * Based on the article here for a performance increase or prevention of performance degradation
 * when hover elements are added to a grid. If your grid has lots of hover events this will keep
 * them from reducing your fps.
 * http://www.thecssninja.com/javascript/pointer-events-60fps
 */
angular.module('ux').factory('disableHoverWhileScrolling', function () {
    return function (exp) {
        var name = "disable-hover-while-scrolling",
            timer;

        function init() {
            exp.flow.log("init");
            ux.css.createClass('grid', '.' + name + ' *', "pointer-events: none !important;");
        }

        function scrollStart() {
            clearTimeout(timer);
            exp.flow.log("scrollStart");
            if (!exp.element[0].classList.contains(name)) {
                exp.element[0].classList.add(name);
            }
        }

        function scrollStop() {
            timer = setTimeout(function () {
                exp.flow.log("scrollStop");
                exp.element[0].classList.remove(name);
            }, 500);
        }

        exp.unwatchers.push(exp.scope.$on(ux.datagrid.events.SCROLL_START, scrollStart));
        exp.unwatchers.push(exp.scope.$on(ux.datagrid.events.SCROLL_STOP, scrollStop));

        init();

        return exp;
    };
});