
# **project13 Backend**

Учебный проект Яндекс.Практикум по созданию серверного приложения и базы данных.

## **Основной функционал проекта**

Обработка запросов на локальном сервере:
+ GET /users — возвращает всех пользователей;
+ GET /users/:userId - возвращает пользователя по _id;
+ POST /users — создаёт пользователя;
+ GET /cards — возвращает все карточки;
+ POST /cards — создаёт карточку;
+ DELETE /cards/:cardId — удаляет карточку по идентификатору.

## **Используемые технологии**

+ Node.js;
+ Express;
+ Eslint;
+ Nodemon;
+ Mongodb;
+ Mongoose;
+ Nodemon.

## **Актуальная версия проекта**

***v.0.0.2***

## **Как запустить проект**

Необходимо скачать проект, установить необходимые компоненты командой **npm install**. Отправка запросов можно осуществлять через Postman.  Также потребуется установка Compass. Чтобы запустить проект нужно ввести комманды в терминале **npm run start** или **npm run dev**. Запустить базу данных командой **mongod**. Затем через **Postman** делать соответствующие запросы по адресу  **http://localhost:3200/...** .
