// Наш герой.

class Hero {
  constructor({ position, position2, boomerang }) {
    this.skin = '🚌';
    this.position = position;
    this.position2 = position2;
    this.boomerang = boomerang;
  }

  moveLeft() {
    // Идём влево.
    this.position > 0 ? (this.position -= 1) : null;
    this.position2 > 0 ? (this.position -= 1) : null;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    this.position2 += 1;
  }

  moveUp() {
    //  идем вверх
    if (this.position2 >= 0) {
      this.position = this.position2;
      this.position2 = undefined;
    }
  }

  moveDown() {
    // идем вниз
    if (this.position >= 0) {
      this.position2 = this.position;
      this.position = undefined;
    }
  }

  attack() {
    // Атакуем.
    if (this.position >= 0) {
      this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
      this.boomerang.position2 = undefined;
    }
    if (this.position2 >= 0){
      this.boomerang.position2 = this.position2 + 1; // Устанавливаем начальную позицию бумеранга
      this.boomerang.position = undefined;
    }

    this.boomerang.fly();
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
