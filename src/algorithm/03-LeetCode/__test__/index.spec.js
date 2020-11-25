test('反转字符串中的单词',() => {
    const { reverseWords } = require('../reverseStr')
    const str = "Let's take LeetCode contest";
    expect(reverseWords(str)).toBe("s'teL ekat edoCteeL tsetnoc");
})

test('计数二进制子串',() => {
    const { countBinarySubstrings } = require('../countBinarySubstrings')
    const str = "00110011";
    expect(countBinarySubstrings(str)).toBe(6);
})

test('种花问题',() => {
    const { canPlaceFlowers } = require('../canPlaceFlowers')
    const flowerbed = [1,0,0,0,1], n = 1
    expect(canPlaceFlowers(flowerbed, n)).toBe(true);
})