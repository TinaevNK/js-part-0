# Домашнее задание по JS, первая лекция

## Кому и когда сдавать

Иван Петропольский, фронтенд-разработчик в команде Монетизации.

Домашки принимаются до 20-го декабря включительно в Mattermost в личке.

Если что-то непонятно или не получается сделать — приходите в Mattermost, обсудим, решим, посмотрим примеры.

## Задание

1) Установите [yarn](https://classic.yarnpkg.com/lang/en/docs/install/), если его нет.
2) Сделайте форк репозитория https://github.com/ipetropolsky/js-part-0
3) Склонируйте его к себе на машину, создайте ветку от master.
4) Установите зависимости для линтинга (запустите `yarn` в папке проекта).
5) Включите в своём редакторе ESLint, отключите JSHint и другие линтеры.
6) Поправьте функцию `test()` так, чтобы она работала с массивами примитивов.
7) Запускайте код в консоли браузера (это неудобно) или любым другим способом.
8) Добавьте отсутствующий код так, чтобы проходили все тесты.
9) Проверьте, что нет ошибок и ворнингов: `yarn eslint .`
10) Сделайте пулл-реквест *в своём репозитории*, поставьте меня ревьювером и скиньте линк на него.

Некоторые правила `eslint`, которые мы обычно используем, отключены для удобства разработки.
Например, [`no-unused-vars`](https://eslint.org/docs/latest/rules/no-unused-vars), [`no-console`](https://eslint.org/docs/latest/rules/no-console), [`no-new-wrappers`](https://eslint.org/docs/latest/rules/no-new-wrappers).

### Важно

Можно пользоваться чем угодно, главное не списывать у коллег. А вот обсуждать варианты решений — пожалуйста, это всегда полезно.

Переименовывать функции и править комменты можно, но смотрите на дифф.
Всё стереть и переписать на jest и lodash прикольно, но усложнит ревью.
И в реальной жизни у вас обычно нет возможности просто переписать всё как вам захочется :)

### Опционально

* Поставьте Node.js: https://nodejs.org/en/download/
* Запускайте код в терминале: `node index.js` (это удобно).
* Добавьте недостающих тестов на своё усмотрение (отдельным коммитом).

## Что должно получиться

```
# getType

  [OK] Boolean

  [OK] Number

  [OK] String

  [OK] Array

  [OK] Object

  [OK] Function

  [OK] Undefined

  [OK] Null

# allItemsHaveTheSameType

  [OK] Values with the same type

  [OK] Values with various types

  [OK] Values like a number

  [OK] Values like an object

# getTypesOfItems VS getRealTypesOfItems

  [OK] Check basic types

  [OK] Check real types

# everyItemHasAUniqueRealType

  [OK] All value types in the array are unique

  [OK] Two values have the same type

  [OK] There are no repeated types in knownTypes

# countRealTypes

  [OK] Count unique types of array items

  [OK] Counted unique types are sorted
```
