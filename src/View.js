// Сделаем отдельный класс для отображения игры в консоли.

class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    const yourTeamName = 'Team-AGA';

    // Тут всё рисуем.
    console.clear();
    console.log('\n\n')
    console.log(this.game.track.join(''));
    console.log(this.game.track2.join(''));
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
