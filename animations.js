$(window).on("load", function () {
    let ua = window.navigator.userAgent.toLowerCase(),
        is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua); //проверка для Internet Explorer
    let root = document.querySelector(':root');

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

    function initializeClock(id, deadline) {
        let clock = document.getElementById(id);
        let list = clock.querySelector(".cd-container > ul");
        let result = deadline.split('');
        let numbers = [];
        for (let i = 0; i < result.length; i++) {
            let block = `
                <li class="cd_${i}">
                    <div class="cd_anim">
                        <div class="cd_num below">
                            <div class="cd_top-num">
                                <div class="cd_shadows"></div>
                                <div class="cd_part number">0</div>
                            </div>
                            <div class="cd_bottom-num">
                                <div class="cd_shadows"></div>
                                <div class="cd_part number">0</div>
                            </div>
                        </div>
                        <div class="cd_num above">
                            <div class="cd_top-num">
                                <div class="cd_shadows"></div>
                                <div class="cd_part number-min">0</div>
                            </div>
                            <div class="cd_bottom-num">
                                <div class="cd_shadows"></div>
                                <div class="cd_part number-min">0</div>
                            </div>
                        </div>
                    </div>
                </li>`;
            numbers.push(0);
            list.innerHTML += block;
        }
        let numberSpan = clock.querySelectorAll(".number");
        let numberMinSpan = clock.querySelectorAll(".number-min");

        function animateTimer(id, i) {
            if (clock.classList.contains("init")) {
                let section = clock.querySelector(".cd_" + i);
                let below = section.querySelectorAll(".below");
                let above = section.querySelectorAll(".above");
                for (let i = 0; i < below.length; i++) {
                    below[i].classList.add("prev");
                }
                for (let i = 0; i < above.length; i++) {
                    above[i].classList.add("next");
                }
                setTimeout(function () {
                    for (let i = 0; i < below.length; i++) {
                        below[i].classList.remove("prev");
                    }
                    for (let i = 0; i < above.length; i++) {
                        above[i].classList.remove("next");
                    }
                }, timeForCounter * 9 / 10);
            } else {
                clock.classList.add("init");
            }
        }

        function updateClock() {
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] != result[i]) {
                    numberSpan[2 * i].innerHTML = numbers[i];
                    numberSpan[2 * i + 1].innerHTML = numbers[i];
                    numberMinSpan[2 * i].innerHTML = numbers[i] + 1;
                    numberMinSpan[2 * i + 1].innerHTML = numbers[i] + 1;
                    numbers[i]++;
                    animateTimer(id, i);
                }
            }
            console.log(numbers.join(), result.join());
            if (result.join() == numbers.join()) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        let timeinterval = setInterval(updateClock, timeForCounter);
    }

    let deadline = '040506';
    let timeForCounter = 400;
    if (deadline) {
        initializeClock("counter", deadline);
    }


});