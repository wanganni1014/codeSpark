test('算法练习01 螺旋遍历二维数组',() => {
    const { spiralOrder } = require('../index')
    const arr = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];
    // Use .toStrictEqual to test that objects have the same types as well as structure.
    expect(spiralOrder(arr)).toStrictEqual(
        [1, 2, 3, 6, 9, 8, 7, 4, 5] 
    )
})