const Game = require("./Game");
const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const Boomerang = require("./game-models/Boomerang");

// Сделаем отдельный класс для отображения игры в консоли.

class View {
  constructor(game) {
    this.game = game;
  }

  async render() {
    
    const yourTeamName = 'Team-AGA';
    
    // Тут всё рисуем.
    console.clear();
    console.log(`${this.game.hero.live}\nТекущий счет: ${this.game.hero.scores}\n Имя: ${this.game.hero.name}`)
    console.log('\n\n')
    console.log(this.game.track.join(''));
    console.log(this.game.track2.join(''));
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
