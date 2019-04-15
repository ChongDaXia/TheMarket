/**
* @description 绑定事件 on(element, event, handler)
*/
export const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/**
* @description 解绑事件 off(element, event, handler)
*/
export const off = (function() {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

/**
* @description 函数节流
* @param {Function} method 要执行的函数
* @param {Object} context 作用域
* @param {Number} time 节流时间
*/
export const throttle = (method, context, time = 100) => {
    return function() {
        clearTimeout(method.tId);
            method.tId = setTimeout(function() {
            method.call(context);
        }, time);
    };
};