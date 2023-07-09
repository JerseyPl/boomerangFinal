# Работа с БД

Инструмент для проектирования БД: https://drawsql.app/

## Инициализация Sequelize и создание БД:

1. Устанавливаем sequelize `npm i sequelize pg pg-hstore`
2. Устанавливаем инструменты sequelize для командной строки `npm i sequelize-cli`
3. создаём файл `.sequelizerc` в корне проекта
4. `npx sequelize init`
5. меняем данные для доступа к бд в `db/config/database.json`
6. создаём базу данных `npx sequelize db:create`

## Создание миграций и моделей (повторять для каждой таблицы)

1. создаём миграции и модели `npx sequelize model:generate --name User --attributes login:text,password:text`. Модель всегда начинается с большой буквы в единственном числе.
2. Зайти в миграции и изменить колонки если это необходимо (allowNull, unique, defaultValue).
3. Также прописать связи в миграциях (references, onDelete).
4. Те изменения, которые мы внесли в миграции нужно перенести в модели (и поменять Sequelize на DataTypes).
5. Применяем миграции, чтобы создать таблицы `npx sequelize db:migrate`
   1. _Если нужно отменить все миграции: `npx sequelize db:migrate:undo:all`_
6. Прописываем связи между моделями в методы associate моделей

## Создание сидов (начальных данных)

1. Сгенерировать сид: `npx sequelize seed:generate --name users`
2. Написать код добавления (и удаления) начальных данных в сид
3. Применить все сиды `npx sequelize db:seed:all`
