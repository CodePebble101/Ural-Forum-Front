<template>
    <div class="final-page">
      <div class="message">
        <p>Игра закончилась!</p>
        <p>Спасибо, что играли!</p>
        <router-link to="/">
          <button class="orange-button">Пройти игру заново</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Добавьте здесь необходимые методы или данные, если они потребуются для финальной страницы
  };
  </script>
  
  <style>
  .final-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #60B49A, white);
  }
  
  .message {
    text-align: center;
    font-size: 24px;
    color: #fff; /* Цвет текста */
  }
  
  .orange-button {
    background-color: orange;
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  
  