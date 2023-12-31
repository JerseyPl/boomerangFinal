const sound = require('play-sound')((opts = {}));

// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor(trackLength) {
    this.skin = '💥';
    this.position = -1;
    this.trackLength = trackLength;
    this.position2 = undefined
  }

  fly() {
    const distance = 5; // Устанавливаем дистанцию полета бумеранга
    sound.play('./src/sounds/vistrel.wav');
    // Запускаем бумеранг на заданное расстояние
    for (let i = 1; i <= distance; i++) {
      setTimeout(() => this.moveRight(1), 100 * i);
    }

    // Возвращаем бумеранг на заданное расстояние
    for (let i = 1; i <= distance; i++) {
      setTimeout(() => this.moveLeft(1), 100 * (distance + i));
    }

    // Сбрасываем позицию бумеранга после возвращения
    setTimeout(() => this.reset(), 100 * (distance * 2));
  }

  reset() {
    this.position = undefined; // Сброс позиции бумеранга
    this.position2 = undefined;
  }

  moveLeft(distance) {
    // Идём влево.
    this.position -= distance;
    this.position2 -= distance;
  }

  moveRight(distance) {
    // Идём вправо.
    this.position += distance;
    this.position2 += distance;
  }
}

module.exports = Boomerang;
