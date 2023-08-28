# Технічна документація до проекту Inventory:
Даний проект являє собою платформу для моніторингу кількості замовлень по продукти комп'ютерної техніки .

__Реалізація функціоналу:__
- Реєстрація і Авторизація користувача (лічильник сесій;
-валідація форм;
- інтернаціоналізація;
- світла/темна тема;
- роутинг


## Технічний аспект: (Основні концепції)

**Стек технологій:**
### Frontend 
У якості основних інструментів було використано JS/TS та  React. Тестування додатку проводиться за допомогою jest та бібліотеки React testing library;
Архітектурний підхід (методологія):
В основі проекту закладено сучасних архітектурний підхід - FSD (Features Sliced Design). Він дозволяє скомпонувати елементи логіки помодульно, що в свою чергу, вирішує основну проблематику: зводить до мінімуму утворення неявних зв'язків між окремими компонентами системи (кожен модуль містить усю необхідну інформацію для самостійної роботи, та за потреби може бути видаленим або заміненим без значних затрат на розробку).
Компіляція проекту відбувається за допомогою кастомно налаштованої конфігурації webpack.

### Backend
У якості серверної частини було обрано платформу Nodejs (на базі фреймворку express.js). Операції зі збереженням даних відбуваються через БД MongoDB.

**Локальне розгортання проекту:**
Для розгортання необхідно виконати наступні дії:
-__Для фронтенд частини:__
1) клонувати даний проект;
2)Перейти в папку client та встановити модулі за допомогою команди npm і ;
3) Запустити проект в режимі девелопменту командою npm run start, або npm run build:dev;
4) Для запуску проекту в режимі production : npm run build:prod
5) Щоб запустити процес тестування, необхідно ввести наступну команду npm run test:unit
__Для бекенд частини:__
1) перейти в папку server та встановити модулі командою npm i;
2) запустити слокальниц сервер командою npm run dev

### User Guide:
- При першому вході на платформу, користувач потрапляє на головну сторінку, на якій розміщено наступну інформацію:
1) Навігаційна панель (Navbar) з можливістю реєстрації/авторизації користувача та логотип;
2) Бокова панель (Sidebar) - список посилань для переходу на сторінки замовлень та продуктів, в також, 2 дві кнопки, що дозволять змінювати мову системи та тему додатку (зі світлої на темну, і навпаки);
3)  Головна сторінка - основний структурний блок взаємодії з користувачем;

- Для того, щоб розпочати роботу з додатком, користувачеві необхідно пройти процедуру Реєстрації/Авторизації. Після успішного завершення даного процесу, у правому куті навігаційної панелі з'явиться ім'я поточного користувача (логін), та актуальний час, а також кнопка виходу зі системи.

- При натисканні на посилання з назвою сторінки - користувач потрапляє на відповідну сторінку. Слід зазначити, що у випадку, якщо користувач не був попередньо залогінений (не пройшов процес авторизації) - на Головній Сторінці з'явиться текст-інформування.

- при натисканні на кнопку зі зображенням поточної теми додатку (місяць/день) - тему буде змінено на протилежну ("день-ніч", або "ніч-день")

- якщо користувач захоче змінити мову  додатку, він може це зробити натиснувши на кнопку з назвою поточної мови. Зробивши це, мову буде змінено.

