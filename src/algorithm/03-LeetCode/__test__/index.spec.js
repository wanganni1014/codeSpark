test('反转字符串中的单词',() => {
    const { reverseWords } = require('../reverseStr')
    const str = "Let's take LeetCode contest";
    expect(reverseWords(str)).toBe("s'teL ekat edoCteeL tsetnoc");
})