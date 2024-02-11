<template>
    <body class="body">
        <router-link to="/game">
            <button class="blue-button">Начать игру</button>
        </router-link>
        <img src="src\public\img\BOYS2.png" class="boys">
        </body>
        <p>
            Финансовый Университет При Правительстве Российской Федерации
        </p>
        <p>
            г.Москва
        </p>
        <p>
            Помоги Диме выбрать правильное решение
        </p>
        <p>
            Приключение в киберпространстве
        </p>
        <p style="width: 459px; height: 196px; top: 485px; left: 294px; position: relative; size: 80px;">
            CyberKids Academy
        </p>
</template>

<style>
.blue-button {
    position: absolute;
    background-color: rgb(65,176,220);
    color: white;
    cursor: pointer;
    width: 275px;
    height: 55px;
    top: 85%;
    left: 20%;
    border-radius: 100px;
}
.boys {
    height: 100vh;
    width: auto;
    position: absolute;
    left: 85vh;
}
.lines {
    width: 1920px;
    height: 1014px;
    top: 6px;
    left: -41px;
}
.zamok {
    width: 537.5px;
    height: 303.26px;
}
.body {
    object-fit: cover;
    width: 100%;
    height: auto;
}
</style>