class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class NodeList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // 追加的方法
    append(data) {
        let node = new Node(data);
        let cur;

        if (!this.head) {
            this.head = node;
        } else {
            cur = this.head;
            while(cur.next) {
                cur = cur.next
            }
            cur.next = node;
        }
        this.length+=1;
    }

    // 打印的方法
    print() {
        let cur = this.head;
        let ret = [];
        while(cur) {
            ret.push(cur.data);
            cur = cur.next;
        }
        console.log(ret.join('==>')); // result: 
        return ret;
    }

    // 删除指定索引的链表数据
    removeAt(index) {
        let cur = this.head;
        let i = 0;
        let prev;
        if (index === 0) {
            this.head = cur.next;
        } else {
            while(i< index) {
                prev = cur;
                cur = cur.next
                i++;
            }
            prev.next = cur.next;
            // 释放内存
            cur.next = null; 
        }
    }
}

let linkedList = new NodeList();
linkedList.append('你瞅啥');
linkedList.append('瞅你咋地啊');
linkedList.append('嘿嘿');
linkedList.append('😝');
linkedList.print();
linkedList.removeAt(1);
linkedList.print();