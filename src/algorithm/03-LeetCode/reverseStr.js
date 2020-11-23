// 反转字符串中的单词
// 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
// 示例:
// 输入："Let's take LeetCode contest"
// 输出："s'teL ekat edoCteeL tsetnoc"
// 提示:在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。


module.exports.reverseWords = (str) => {
    // 思路:
    // 1. 字符串按照空格进行分隔,保存数组,数组的元素的先后顺序就是单词的顺序
    // 2. 对数组进行遍历,然后每个元素进行反转
    return str.split(' ').map(item => {
        return item.split('').reverse().join('')
    }).join(' ')
};