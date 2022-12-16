// Test utils

const testBlock = (name) => {
    console.groupEnd();
    console.group(`# ${name}\n`);
};

const areEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.flat().every((el, i) => el === b.flat()[i]);
    }

    return a === b;
};

const test = (whatWeTest, actualResult, expectedResult) => {
    if (areEqual(actualResult, expectedResult)) {
        console.log(`[OK] ${whatWeTest}\n`);
    } else {
        console.error(`[FAIL] ${whatWeTest}`);
        console.debug('Expected:');
        console.debug(expectedResult);
        console.debug('Actual:');
        console.debug(actualResult);
        console.log('');
    }
};

// Functions

const getType = (value) => typeof value;

const getTypesOfItems = (arr) => arr.map(getType);

const allItemsHaveTheSameType = (arr) => {
    const type = typeof arr[0];
    return arr.every((item) => getType(item) === type);
};

const getRealType = (value) => {
    if (Number.isNaN(value)) {
        return 'NaN';
    } else if (!Number.isFinite(value) && typeof value === 'number') {
        return 'Infinity';
    }

    const str = Object.prototype.toString.call(value).slice(8, -1);
    return str.charAt(0).toLowerCase() + str.slice(1);
};

const getRealTypesOfItems = (arr) => arr.map(getRealType);

const everyItemHasAUniqueRealType = (arr) => {
    const itemsRealType = getRealTypesOfItems(arr);
    const uniqueItems = new Set(itemsRealType);

    return uniqueItems.size === itemsRealType.length;
};

const countRealTypes = (arr) => {
    const map = arr.reduce((acc, item) => {
        const realType = getRealType(item);
        // eslint-disable-next-line no-unused-expressions, no-plusplus
        acc[realType] ? acc[realType]++ : (acc[realType] = 1);
        return acc;
    }, {});

    return Object.entries(
        Object.keys(map)
            .sort()
            .reduce((acc, key) => {
                acc[key] = map[key];
                return acc;
            }, {})
    );
};

// Tests

testBlock('getType');

test('Boolean', getType(true), 'boolean');
test('Number', getType(123), 'number');
test('String', getType('whoo'), 'string');
test('Array', getType([]), 'object');
test('Object', getType({}), 'object');
test(
    'Function',
    getType(() => {}),
    'function'
);
test('Undefined', getType(undefined), 'undefined');
test('Null', getType(null), 'object');

testBlock('allItemsHaveTheSameType');

test('All values are numbers', allItemsHaveTheSameType([11, 12, 13]), true);

test('All values are strings', allItemsHaveTheSameType(['11', '12', '13']), true);

test('All values are strings but wait', allItemsHaveTheSameType(['11', new String('12'), '13']), false);

test('Values like a number', allItemsHaveTheSameType([123, 123 / 'a', 1 / 0]), true);

test('Values like an object', allItemsHaveTheSameType([{}]), true);

testBlock('getTypesOfItems VS getRealTypesOfItems');

const knownTypes = [
    true,
    108,
    'Lost',
    [4, 8, 15, 15, 23, 42],
    { dharma: 'initiative' },
    () => console.log('Не доверяйте Бэну'),
    undefined,
    null,
    NaN,
    Infinity,
    new Date(),
    /^[0-9]+/,
    new Set(),
    10n,
    async () => 'Я состою из двух слов',
    new Map(),
    new Promise((resolve) => {
        resolve('А кто тут у нас дал обещание?)');
    }),
];

test('Check basic types', getTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'object',
    'object',
    'function',
    'undefined',
    'object',
    'number',
    'number',
    'object',
    'object',
    'object',
    'bigint',
    'function',
    'object',
    'object',
]);

test('Check real types', getRealTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'array',
    'object',
    'function',
    'undefined',
    'null',
    'NaN',
    'Infinity',
    'date',
    'regExp',
    'set',
    'bigInt',
    'asyncFunction',
    'map',
    'promise',
]);

testBlock('everyItemHasAUniqueRealType');

test('All value types in the array are unique', everyItemHasAUniqueRealType([true, 123, '123']), true);

test('Two values have the same type', everyItemHasAUniqueRealType([true, 123, '123' === 123]), false);

test('There are no repeated types in knownTypes', everyItemHasAUniqueRealType(knownTypes), true);

testBlock('countRealTypes');

test('Count unique types of array items', countRealTypes([true, null, !null, !!null, {}]), [
    ['boolean', 3],
    ['null', 1],
    ['object', 1],
]);

test(
    'Counted unique types are sorted',
    countRealTypes([{}, null, true, !null, !!null, 'lost', {}, new Set(), [4, 8, 15, 16, 23, 42], new Date()]),
    [
        ['array', 1],
        ['boolean', 3],
        ['date', 1],
        ['null', 1],
        ['object', 2],
        ['set', 1],
        ['string', 1],
    ]
);
