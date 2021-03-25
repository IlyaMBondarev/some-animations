//Анимация на карте

//количество пунктиров для каждой линии против часовой стрелки, начиная с левой верхней
let sizes = [ 36, 39, 18, 27, 42 ];

//скорость движения линий на карте
let speed = 150;

//интервал появления линий. Минимальная величина - 9 * длина большей линии
let interval = 500;
let minInterval = 9 * Math.max(...sizes);

//время движения линий
let time = 3000;


//непосредственно реализация анимации

let linesBlockSvg = document.querySelector('.lines > svg');
let linePaths = linesBlockSvg.querySelectorAll('path');
let root = document.querySelector(':root');
root.style.setProperty("--firstinterval", `${9 * sizes[0] + interval}`);
root.style.setProperty("--secondinterval", `${9 * sizes[1] + interval}`);
root.style.setProperty("--thirdinterval", `${9 * sizes[2] + interval}`);
root.style.setProperty("--fourthinterval", `${-(9 * sizes[3] + interval)}`);
root.style.setProperty("--fifthinterval", `${-(9 * sizes[4] + interval)}`);

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
        path.style.animation = `${time}ms linear 200ms infinite line${index + 1}`;
    }, Math.random() * time)
})




//Анимация счетчика