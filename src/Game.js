
const readlineSync = require('readline-sync');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
const sound = require('play-sound')((opts = {}));
const { draw, drawAsString } = require('terminal-img');
const { Score } = require("../db/models");

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({
      position: 0,
      position2: undefined,
      boomerang: this.boomerang,
    });
    this.enemy = new Enemy(trackLength);
    this.secEnemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.track2 = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[0] = '⛽';
    this.track[this.enemy.position] = this.enemy.skin;
    if (this.hero.position >= 0) {
      this.track[this.hero.position] = this.hero.skin;
    }
    if (
      this.hero.boomerang.position >= 0 &&
      this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }

    this.track2 = new Array(this.trackLength).fill(' ');
    this.track2[0] = '⛽';
    this.track2[this.secEnemy.position] = this.secEnemy.skin;

    if (this.hero.position2 >= 0) {
      this.track2[this.hero.position2] = this.hero.skin;
    }

    if (
      this.hero.boomerang.position2 >= 0 &&
      this.hero.boomerang.position2 < this.trackLength
    ) {
      this.track2[this.hero.boomerang.position2] = this.hero.boomerang.skin;
    }
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
    if (this.hero.position2 === this.secEnemy.position2) {
      this.hero.die();
    }
  }


  play() {
    console.log(
      await draw('./src/game-models/twisted-metal.png', { width: 210, height: 90 })
    );
    this.hero.name = readlineSync.question('\nВведите свое имя: ');

    process.stdin.resume();
    if (!this.hero.name) {
      this.hero.name = 'Водила';
    }
    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();
      this.secEnemy.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        this.enemy = new Enemy(this.trackLength);
      }
      if (this.secEnemy.position2 < 0) {
        this.secEnemy = new Enemy(this.trackLength);
      }

      this.view.render(this.track);
    }, 120); // Вы можете настроить частоту обновления игрового цикла
  }

  handleCollisions() {
    if (
      (this.hero.position >= this.enemy.position &&
        this.hero.position - this.enemy.position < 1) ||
      (this.hero.position2 >= this.secEnemy.position2 &&
        this.hero.position2 - this.secEnemy.position2 < 1)
    ) {
      this.hero.liveCount -= 1;
      if (this.hero.liveCount === 2) {
        this.hero.live = 'Твои никчемные жизни: 🤡🤡💀';
        sound.play('./src/sounds/avaria.wav');
      }
      if (this.hero.liveCount === 1) {
        this.hero.live = 'Твои никчемные жизни: 🤡💀💀';
        sound.play('./src/sounds/avaria.wav');
      }
      if (this.hero.liveCount === 0) {
        this.hero.live = 'Твои никчемные жизни: 💀💀💀';
        this.hero.die();
        sound.play('./src/sounds/gameover.wav');
      }
    }

    if (this.boomerang.position >= this.enemy.position) {
      // sound.play("./src/sounds/enemyDie.wav");
      this.enemy.die();
      this.hero.scores += 1;
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.position = undefined;
      this.enemy = new Enemy(this.trackLength);
    } // Создаем нового врага
    if (this.boomerang.position2 === this.secEnemy.position2) {
      sound.play('./src/sounds/enemyDie.wav');
      this.secEnemy.die();
      this.hero.scores += 1;
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.position2 = undefined;
      this.secEnemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}
module.exports = Game;
