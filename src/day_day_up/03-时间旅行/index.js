// 时间旅行就是让程序可以在自己历史状态里面任意穿梭，想想Office和PS软件中的Undo和Redo就知道。再想想王者荣耀的录像功能。
// 时间旅行实际上就是设计模式中的备忘录模式。这个到我们可以练习设计模式的时候再升华，先不在这里强行渡劫。
module.exports = createHistory = () => {
    const timeline = {};

    timeline.past = [];
    timeline.future = [];

    timeline.gotoState = (index) => {
        const allState = [...timeline.past, timeline.present, ...timeline.future];
        timeline.present = allState[index];
        timeline.past = allState.slice(0, index);
        timeline.future = allState.slice(index + 1, allState.length);
    };

    timeline.getIndex = () => {
        // 获取当前状态的index
        return timeline.past.length;
    };

    // 保存当前状态
    timeline.push = (currentState) => {
        // 将状态都保存,并更新当前状态
        if (timeline.present) {
            timeline.past.push(timeline.present)
        }
        timeline.present = currentState;
    };

    // 后退
    timeline.undo = () => {
        if (timeline.past.length !== 0 ) {
            timeline.gotoState(timeline.getIndex() - 1);
        }
    };

    // 前进
    timeline.redo = () => {
        if (timeline.future.length !== 0) {
            timeline.gotoState(timeline.getIndex() + 1);
        }
    }

    return timeline;
}