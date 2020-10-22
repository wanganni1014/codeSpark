import React, { useState, Component } from 'react';
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

// export default App;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }

    addList = () => {
        let arr = this.state.arr;
        arr.push('Hello React');
        this.setState({
            arr: arr
        }, () => {
            console.log(this.state.arr);
        });
    };

    deleteList = () => {
        const { arr } = this.state;
        arr.splice(0, 1);
        this.setState({
            arr: arr
        }, () => {
            console.log(this.state.arr);
        });
    };

    render() {
        const { arr } = this.state;
        return (
            <div>
                {
                    arr.map((item, index) => (
                        <p key={index}>{index} {item}</p>
                    ))
                }
            <button onClick={this.addList}>添加List</button>
            <button onClick={this.deleteList}>删除List</button>
        </div> 
        );
    }
}
