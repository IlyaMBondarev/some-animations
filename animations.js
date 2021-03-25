
var ua = window.navigator.userAgent.toLowerCase(),
    is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua); //проверка для Internet Explorer

console.log(is_ie);

if (is_ie) { // если IE
    let linesBlockSvg = document.querySelector('.lines > svg');
    let linePaths = linesBlockSvg.querySelectorAll('path');
    for (let i = 0; i < linePaths.length; i++) {
        linePaths[i].style.strokeDasharray = "6 3";
    }

} else { //для всех остальных браузеров

    //Анимация линий на карте

    //количество пунктиров для каждой линии против часовой стрелки, начиная с левой верхней

    var sizes = [36, 39, 18, 27, 42];

    //интервал появления линий. Минимальная величина - 9 * длина большей линии
    var interval = 500;
    var minInterval = 9 * Math.max.apply(Math, sizes);

    //время движения линий
    var time = 4000;

    //непосредственно реализация анимации
    var linesBlockSvg = document.querySelector('.lines > svg');
    var linePaths = linesBlockSvg.querySelectorAll('path');
    var root = document.querySelector(':root');
    root.style.setProperty("--firstinterval", "".concat(9 * sizes[0] + interval));
    root.style.setProperty("--secondinterval", "".concat(9 * sizes[1] + interval));
    root.style.setProperty("--thirdinterval", "".concat(9 * sizes[2] + interval));
    root.style.setProperty("--fourthinterval", "".concat(-(9 * sizes[3] + interval)));
    root.style.setProperty("--fifthinterval", "".concat(-(9 * sizes[4] + interval)));

    if (interval < minInterval) {
        interval = minInterval;
    }

    linePaths.forEach(function (path, index) {
        path.style.strokeDasharray = "0 ".concat(interval);

        for (var j = 0; j < sizes[index] + 2; j++) {
            path.style.strokeDasharray += " 6 3";
        }

        path.style.transition = "stroke-dashOffset ".concat(time, "ms linear");
        setTimeout(function () {
            path.style.animation = "".concat(time, "ms linear 200ms infinite line").concat(index + 1);
        }, Math.random() * time);
    });
}



//Анимация счетчика
