const createHistory = require("../index");
// 前进undo
it("前进undo ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.undo()
    expect(history.present.num).toBe(2)
});
// 回退redo
it("回退redo ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.push({num: 4})
    history.undo()
    history.undo()
    history.undo()
    history.redo()
    expect(history.present.num).toBe(2)
});
// 定点漂移
it("定点回退 ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.gotoState(1)
    expect(history.present.num).toBe(2)
});
