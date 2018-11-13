import React, {Component} from "react";
import ResultsPage from "./ResultsPage";
import "./App.css";

// export default class App extends Component {
//     render () {
//         return <div id="background">
//             <div id="header">
//                 <h1>Howdy partner</h1>
//                 <p>Gary is a ball liker</p>
//             </div>  
//             <input></input>
//         </div>
//     }
// }

export default class App extends Component {
    render () {
        return (
            <div>
                <ResultsPage />
            </div>
        )
    }
}

