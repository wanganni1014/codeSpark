import React, { useState, Component, useEffect, useRef } from 'react';
// function App() {
//     const [arr, updateArr] = useState([]);
//     const addList = () => {
//         arr.push('Hello React');
//         updateArr([...arr]);
//     };
//     return (
//         <div>
//             {
//                 arr.map((item, index) => (
//                     <p key={index}>{index} {item}</p>
//                 ))
//             }
//             <button onClick={addList}>添加List</button>
//         </div> 
//     );
// }

function App() {
    const [count, updateCount] = useState(0);

    useEffect(() => {
        let timer = setTimeout(() => {
            updateCount(1);
            getCount();
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    let ref = useRef();
    ref.current = count;
    const getCount = () => {
        console.log(ref.current); // result: 1
    };
    
    return (
        <div>{count}</div> 
    );
}

export default App;


// let timer = null;
// export default class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         }
//     }

//    componentDidMount() {
//         timer = setTimeout(() => {
//             this.setState({
//                 count: 1
//             })
//             this.getCount();
//         }, 1000);
//    }


//    getCount = () => {
//         console.log(this.state.count); // result: 1
//    }

//    componentWillUnmount() {
//         clearTimeout(timer);
//    }

//     render() {
//         const { count } = this.state;
//         console.log(count); // result: 1
//         return (
//             <div>{count}</div> 
//         );
//     }
// }


// 1.[react-hook-usestate-setState](http://www.ptbird.cn/react-hook-usestate-setState.html)
// 2.[精读《Function Component 入门》](https://juejin.im/post/6844903854174109703)