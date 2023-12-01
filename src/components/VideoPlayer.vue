<template>
  <div class="video-container">
    <p v-if="start" class="name">
      <font size="10">CyberKidz Academy: Приключения в киберпространстве</font></p>
    <div v-if="!showModalVideo" class="center-button">
      <button class="orange-button_start" @click="startTest">Начать игру</button>
    </div>
    <div class="video-frame" v-show="showModalVideo">
      <div>
        <button class="orange-button" @click="skipVideo">Пропустить видео</button>
      </div>
      <video ref="videoPlayer" controls autoplay muted @ended="blurVideo">
        Your browser does not support the video tag.
      </video>
      <div class="modal" v-if="showModalBut">
        <div v-if="!showResult">
          <div class="modal-content">
            <div class="question">
              <p>{{ question.text }}</p>
            </div>
            <!-- Создаем кнопки для каждого элемента в массиве answers -->
            <button
            v-for="answer in question.answers"
            :key="answer.id"
            class="orange-button"
            @click="selectOption(answer.id)"
          >
            {{ answer.text }}
            </button>

          </div>
        </div>
        <div v-if="showResult && isCorrect"  class="result-container1" >
          <p v-if="!resultMessage">Ты молодец!</p>   
          <p>{{ resultMessage}}</p>
          <router-link v-if="isFynal == true || this.currentVideoIndex == null" to="/final">
            <button class="orange-button">Закончить игру</button>
          </router-link>
          <button v-if="!isFynal && this.currentVideoIndex != null" class="orange-button" @click="playVideo">Продолжить</button>
        </div>
        <div v-if="showResult && !isCorrect" class="result-container2" >
          <p v-if="!resultMessage">Допущена ошибка(</p>  
          <p>{{ resultMessage }}</p>
          <router-link v-if="isFynal == true || this.currentVideoIndex == null" to="/final">
            <button class="orange-button">Закончить игру</button>
          </router-link>
          <button v-if="!isFynal && this.currentVideoIndex != null" class="orange-button" @click="playVideo">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        start: true,
        currentQuestionId: 0,
        isFynal: false,
        question: null, 
        currentVideoIndex: 1,
        currentAnswer: null,
        currentAnswerId: 0,
        showModalVideo: false,
        showModalBut: false,
        userChoice: null,
        showResult: false,
        isCorrect: null,
        resultMessage: ''
      };
    },
    methods: {
      startTest() {
        this.start = false;
        this.showModalVideo = true; // Показываем модальное окно с видео и кнопками выбора
        const video = this.$refs.videoPlayer;
        video.muted = false; // Включаем звук у видео
        this.playVideo(); // Запускаем видео
    },
      selectOption(option) {
        this.userChoice = option;
        this.checkResult();        
    },
      playVideo() {
        if (this.currentVideoIndex != null){
          this.showResult = false;
          this.showModalBut = false;
          const video = this.$refs.videoPlayer;
          video.muted = false;
          video.src = 'https://ural-forum-api.onrender.com/ural/api/v1/streaming/video/'+ this.currentVideoIndex;
          video.load();
          video.play();
          this.fetchQuestion();
          this.unblurVideo();
        }
        else this.blurVideo();
      },
      async checkResult() {
      try {
        await fetch('https://ural-forum-api.onrender.com/ural/api/v1/qa/answer/check?answer_id=' + this.userChoice, {
        method: 'GET'
      })
        .then(response => {
          if (response.status === 200) {
            response.json().then(info => {
              this.currentAnswer = info.data;
              this.currentAnswerId = this.currentAnswer.id;
              this.currentVideoIndex = this.currentAnswer.next_video_id;
              this.isCorrect = this.currentAnswer.correct;
              this.resultMessage = this.currentAnswer.message;
              this.showResult = true;
            });
          } 
        })
        // здесь можно что-то сделать с полученным вопросом, например, вывести в консоль
      } catch (error) {
        console.error('Ошибка при загрузке вопроса:', error);
      }
      // Здесь можно добавить логику для показа соответствующего фрагмента видео
      },
      blurVideo() {
        const video = this.$refs.videoPlayer;
        video.style.filter = 'blur(5px)'; // применение эффекта размытия   
        this.showModalBut = true;
        if (this.question == null || this.currentVideoIndex == null){
          this.showResult = true;
          this.isFynal = true;
        }
      },
      skipVideo() {
        this.fetchQuestion();
        this.blurVideo();
        const video = this.$refs.videoPlayer;
        video.muted = true; // перематываем видео в конец 
      },
        fetchQuestion() {
        try {
          fetch('https://ural-forum-api.onrender.com/ural/api/v1/qa/question/' + this.currentAnswerId, {
          method: 'GET'
        })
          .then(response => {
            if (response.status === 200) {
              response.json().then(info => {
                this.question = info.data;
                this.currentQuestionId = this.question.id;
              });
            }
            else  this.question = null;
          })
          // здесь можно что-то сделать с полученным вопросом, например, вывести в консоль
        } catch (error) {
          this.question = null;
          console.error('Ошибка при загрузке вопроса:', error);
        }
      },
      unblurVideo() {
        const video = this.$refs.videoPlayer;
        video.style.filter = 'none'; // Удаление эффекта размытия 
      },
    },
    mounted() {
      this.fetchQuestion();
      this.playVideo();
    },
  };
  
  </script>
  
  
  <style> 
  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #60B49A, white);
    height: 100vh; /* Высота экрана */
  }
  
  .video-container video {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  
  .modal-content {
    text-align: center;
  }
  
  .video-frame {
    width: 75%; /* Задаем ширину видео на 75% экрана */
    height: auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: (#60B49A); /* Цвет рамочки */
    margin: auto; /* Центрируем по горизонтали */
  }
  
  .video-frame video {
    width: 100%;
    height: auto;
    border-radius: 15px;
    display: block;
  }
  
  .center-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .orange-button {
    background-color: orange;
    color: white;
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .orange-button_start {
    background-color: orange;
    color: white;
    font-size: 45px;
    padding: 22px 40px;
    margin-bottom: -400px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
  }

  .result-container1 {
    text-align: center;
    background-color: rgb(129, 255, 129);
    max-width: 800px; /* Максимальная ширина видео, если нужно */
    max-height: 800px; /* Максимальная высота видео, если нужно */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .result-container2 {
    text-align: center;
    background-color: rgb(250, 72, 72);
    max-width: 800px; /* Максимальная ширина видео, если нужно */
    max-height: 800px; /* Максимальная высота видео, если нужно */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  video::-webkit-media-controls {
    display: none;
  }
  
  /* Эффект размытия в конце видео */
  .video-container video:ended {
    filter: blur(5px);
  }
  
  .skip-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  }

  .name {
    transform: translate(0%, -100%);
  }
  </style>