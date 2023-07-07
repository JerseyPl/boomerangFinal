// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
// const Boomerang = require('./game-models/Boomerang');
const View = require("./View");
const Boomerang = require("./game-models/Boomerang");

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({ position: 0, position2: undefined, boomerang: this.boomerang });
    this.enemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.track2 = [];
    // this.track3 = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(" ");
    this.track2 = new Array(this.trackLength).fill(" 1");
    // this.track3 = new Array(this.trackLength).fill(" 1");

    this.track[this.hero.position] = this.hero.skin;
    this.track2[this.hero.position] = this.hero.skin;
    // this.track3[this.hero.position] = this.hero.skin;

    this.track[this.enemy.position] = this.enemy.skin;
    this.track2[this.enemy.position] = this.enemy.skin;
    // this.track3[this.enemy.position] = this.enemy.skin;

    if (this.hero.position >= 0) {
      this.track[this.hero.position] = this.hero.skin;
    }
    if (this.hero.position2 >= 0) {
      this.track2[this.hero.position2] = this.hero.skin;
    }
    // if (this.hero.position3 >= 0) {
    //   this.track3[this.hero.position3] = this.hero.skin;
    // }

    if (
      this.hero.boomerang.position >= 0 &&
      this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
    if (
      this.hero.boomerang.position2 >= 0 &&
      this.hero.boomerang.position2 < this.trackLength
    ) {
      this.track2[this.hero.boomerang.position2] = this.hero.boomerang.skin;
    }
  //   if (
  //     this.hero.boomerang.position3 >= 0 &&
  //     this.hero.boomerang.position3 < this.trackLength
  //   ) {
  //     this.track3[this.hero.boomerang.position3] = this.hero.boomerang.skin;
  //   }
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        this.enemy.position = this.trackLength - 1;
      }

      this.view.render(this.track);
    }, 100); // Вы можете настроить частоту обновления игрового цикла
  }

  handleCollisions() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }

    if (this.boomerang.position === this.enemy.position) {
      this.enemy.die();
      // Обнуляем позицию бумеранга после столкновения с врагом
      // this.boomerang.position = -1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
