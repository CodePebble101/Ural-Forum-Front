<template>
  <div class="video-container">
    <div v-if="!showModalVideo" class="center-button">
      <button class="orange-button" @click="startTest">Начать тест</button>
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
        <div v-if="showResult" class="result-container" >
            <p>Ваш выбор: {{ userChoice }}</p>
            <p>{{ resultMessage }}</p>
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
        videos: [
        'http://localhost:10090/ural/api/v1/streaming/video/1',
        'http://localhost:10090/ural/api/v1/streaming/video/1', // Путь к другому видео
        ],
        currentQuestionId: 0,
        question: null, 
        currentVideoIndex: 0,
        currentAnswer: null,
        currentAnswerId: null,
        showModalVideo: false,
        showModalBut: false,
        userChoice: null,
        showOptions: false,
        showResult: false,
        resultMessage: ''
      };
    },
    methods: {
      startTest() {
        this.showModalVideo = true; // Показываем модальное окно с видео и кнопками выбора
        const video = this.$refs.videoPlayer;
        video.muted = false; // Включаем звук у видео
        this.playVideo(); // Запускаем видео
    },
      selectOption(option) {
        this.userChoice = option;
        this.showOptions = false;
        this.currentVideoIndex++;
        console.log(this.currentVideoIndex);
        this.playVideo();
    },
    playVideo() {
        this.unblurVideo();
        const video = this.$refs.videoPlayer;
        video.src = this.videos[this.currentVideoIndex];
        video.load();
        video.play();
      },
      playNextVideo() {
        // При окончании текущего видео запускаем следующее
        this.playVideo();
      },
      async checkResult() {
        try {
          await fetch('http://localhost:10090/ural/api/v1/qa/answer/check?answer_id=' + this.userChoice, {
          method: 'GET'
        })
          .then(response => {
            if (response.status === 200) {
              response.json().then(info => {
                this.currentAnswer = info.data;
                this.currentAnswerId = this.currentAnswer.id;
                this.resultMessage = this.currentAnswer.message;
              });
            } 
          })
          // здесь можно что-то сделать с полученным вопросом, например, вывести в консоль
          console.log(this.question);
        } catch (error) {
          console.error('Ошибка при загрузке вопроса:', error);
        }
        // Здесь можно добавить логику для показа соответствующего фрагмента видео
      },
      blurVideo() {
        const video = this.$refs.videoPlayer;
        video.style.filter = 'blur(5px)'; // применение эффекта размытия
        console.log(this.currentVideoIndex);
        if (this.currentVideoIndex == 1){
          this.checkResult();
          this.showResult = true;        
        }
        this.showModalBut = true;
      },
      skipVideo() {
        const video = this.$refs.videoPlayer;
        video.currentTime = video.duration; // перематываем видео в конец 
      },
      async fetchQuestion() {
      
        try {
          await fetch('http://localhost:10090/ural/api/v1/qa/question/' + this.currentQuestionId, {
          method: 'GET'
        })
          .then(response => {
            if (response.status === 200) {
              response.json().then(info => {
                this.question = info.data;
                this.currentQuestionId = this.question.id;
              });
            } 
          })
          // здесь можно что-то сделать с полученным вопросом, например, вывести в консоль
          console.log(this.question);
        } catch (error) {
          console.error('Ошибка при загрузке вопроса:', error);
        }
      },
      unblurVideo() {
        const video = this.$refs.videoPlayer;
        video.style.filter = 'none'; // Удаление эффекта размытия
        this.showModalBut = false; // отображение модального окна после завершения видео
      },
    },
    mounted() {
      this.fetchQuestion();
      const video = this.$refs.videoPlayer;
      video.src = 'http://localhost:10090/ural/api/v1/streaming/video/1'; // путь к вашему видеофайлу
      video.load();
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
    border-radius: 15px;
    overflow: hidden;
    background-color: blue; /* Цвет рамочки */
    max-width: 1200px; /* Максимальная ширина видео, если нужно */
    max-height: 800px; /* Максимальная высота видео, если нужно */
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

  .result-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* video::-webkit-media-controls {
    display: none;
  } */
  
  /* Эффект размытия в конце видео */
  .video-container video:ended {
    filter: blur(5px);
  }
  
  .skip-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
  </style>