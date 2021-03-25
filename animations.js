

//количество пунктиров для каждой линии против часовой стрелки, начиная с левой верхней
let sizes = [ 36, 39, 18, 27, 42 ];

//скорость движения линий на карте
let speed = 150;

//интервал появления линий. Минимальная величина - 9 * длина большей линии
let interval = 500;
let minInterval = 9 * Math.max(...sizes);

//время движения линий
let time = 1000;

//непосредственно реализация анимации
let linesBlockSvg = document.querySelector('.lines > svg');
let linePaths = linesBlockSvg.querySelectorAll('path');

if (interval < minInterval) {
    interval = minInterval;
}

linePaths.forEach((path, index) => {
    path.style.strokeDasharray = `0 ${interval}`;
    for (let j = 0; j < sizes[index] + 2; j++) {
        path.style.strokeDasharray += " 6 3";
    }
    path.style.transition = `stroke-dashOffset ${time}ms linear`;
    setTimeout(() => {
        if (path.classList.contains('toRight')) {
            setInterval(() => {
                path.style.strokeDashoffset = `${+path.style.strokeDashoffset - speed}`;
            }, time)
        } else {
            setInterval(() => {
                path.style.strokeDashoffset = `${+path.style.strokeDashoffset + speed}`;
            }, time)
        }
    }, Math.random() * time * index)
})