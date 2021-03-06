import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Card from './components/Card/card';
import Toolbar from './components/Toolbar/Toolbar';
import Sidedrawer from './components/Sidedrawer/Sidedrawer';
import "./components/Sidedrawer/Sidedrawer.css";
import { CartProvider } from './components/Cart/CartContext';
import "./about.css";

class App extends React.Component{
    state = { parts: [], drawerVisible: false, value: null, featParts: []}

    fetchPartAPI = () =>{
        fetch('http://localhost:5000/parts/')
        .then(resp => resp.json())
        .then((resp) => {
            console.log(resp);
            this.setState({parts: resp.data})
        });   
    }

    componentDidMount(){
        this.fetchPartAPI();
    }

    drawerToggleHandler = () => { 
        const drawer = document.getElementById('Sidedrawer');
        drawer.classList.toggle('open')
    };

    changeHandler = (e) => {
        this.state.value = e.target.value;
        if (this.state.value === "des") {
            this.setState(this.state.parts.sort(function(a, b) {return b.price - a.price;}));
        }
        if (this.state.value === "asc") {
            this.setState(this.state.parts.sort(function(a, b) {return a.price - b.price;}));
        }
        if(this.state.value === "default"){
            this.setState(this.state.parts = this.fetchPartAPI);
        }
    };

    render() {
       
        return(
        <CartProvider>
        <div id="App" >  
        <Toolbar drawerClickHandler = {this.drawerToggleHandler}/> 
        <Sidedrawer drawerClickHandler={this.drawerToggleHandler}/>
        <div id="about" className="z-0 relative text-center p-8">
            <div className = "mt-32">
             <span class="font-extrabold text-4xl tracking-tight text-black shadow-xl rounded p-1 md:p-4 lg:p-4 bg-gray-200"> <span class="tracking-wide italic text-red-700">XYZ</span> Motorsport</span>
             <p className="text-justify mt-6 shadow-xl rounded p-4 bg-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel tempor nisi. Nullam tristique eleifend augue a aliquam. Vivamus sed volutpat felis. Fusce sodales id lacus id tempus. Ut accumsan metus leo, at mattis felis facilisis sed. Vestibulum pharetra erat efficitur sapien semper rhoncus. Etiam commodo massa ac imperdiet maximus. Cras semper bibendum nulla in pharetra. Quisque interdum accumsan nibh in scelerisque. Pellentesque vehicula lectus at mi volutpat hendrerit. Vestibulum non nulla elit. Nam ac mattis nulla, et accumsan leo. </p>
            </div>
        </div>
        <div className="z-0 inline-block relative w-64 m-6">
                    <select value = {this.state.value} onChange={this.changeHandler} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="default">Featured</option>
                        <option value="asc">Low to High</option>
                        <option value="des">High to Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
            </div>
        <div className="antialiasing text-grey-900 w-100 p-6 flex flex-wrap justify-center">
            {this.state.parts.map(part => <Card name={part.name} price={part.price} brand={part.brand} picid={part.picid} description={part.description}/>)}
        </div>
        </div>
        </CartProvider>
    );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

