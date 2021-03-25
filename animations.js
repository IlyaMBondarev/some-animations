$( window ).on("load", function() {
    var ua = window.navigator.userAgent.toLowerCase(),
        is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua); //проверка для Internet Explorer

    if (is_ie) { // если IE
        let linesBlockSvg = document.querySelector('.lines > svg');
        let linePaths = linesBlockSvg.querySelectorAll('path');
        for (let i = 0; i < linePaths.length; i++) {
            linePaths[i].style.strokeDasharray = "6 3";
        }

    } else { //для всех остальных браузеров

        //Анимация линий на карте

        //количество пунктиров для каждой линии против часовой стрелки, начиная с левой верхней

        let sizes = [36, 39, 18, 27, 42];

        //интервал появления линий
        let interval = 150;

        //время движения линий
        let time = 4000;

        //непосредственно реализация анимации
        let randomNumbers = [0.1, 0.3, 0.5, 0.7, 0.9];
        let linesBlockSvg = document.querySelector('.lines > svg');
        let linePaths = linesBlockSvg.querySelectorAll('path');
        let root = document.querySelector(':root');
        root.style.setProperty("--firstinterval", "".concat(2 * (9 * sizes[0] + interval)));
        root.style.setProperty("--secondinterval", "".concat(2 * (9 * sizes[1] + interval)));
        root.style.setProperty("--thirdinterval", "".concat(2 * (9 * sizes[2] + interval)));
        root.style.setProperty("--fourthinterval", "".concat(-2 * (9 * sizes[3] + interval) + interval));
        root.style.setProperty("--fifthinterval", "".concat(-2 * (9 * sizes[4] + interval) + interval));

        linePaths.forEach(function (path, index) {
            let lineSize = interval + 9 * sizes[index];
            path.style.strokeDasharray = "0 ".concat(lineSize);

            for (let j = 0; j < sizes[index] + 2; j++) {
                path.style.strokeDasharray += " 6 3";
            }

            path.style.transition = "stroke-dashOffset ".concat(time, "ms linear");
            let randomIndex = Math.floor(Math.random() * randomNumbers.length);
            setTimeout(function () {
                path.style.animation = "".concat(time, "ms linear 200ms infinite line").concat(index + 1);
            }, randomNumbers[randomIndex] * time);
            randomNumbers.splice(randomIndex, 1);
        });
    }


//Анимация счетчика

    jQuery(function () {
        let i = 1;
        jQuery('#counter').flipcountdown({
            speedFlip: 40,
            tick: function () {
                return '000000';
            }
        });
        setTimeout(function () {
            jQuery('#counter').flipcountdown({
                speedFlip: 60,
                tick: function () {
                    return '040506';
                }
            });
        }, 0)
    })
});