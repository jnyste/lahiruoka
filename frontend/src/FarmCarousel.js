import React, {Component} from "react";
import './css/FarmCarousel_style.css';
import logo1 from './carrot.jpeg';
import logo2 from './tomato.jpeg';
import logo3 from './wheat.jpeg';
import {Link} from "react-router-dom";

class CarouselItem extends Component {
    render() {
        return (
            <div className="item">
                <Link to="/profiili"><img src={logo3} alt="Vehnä"/></Link>

                <div className="carousel-caption">
                    <h3>{this.props.item.companyName}</h3>
                    <p>{this.props.item.info}</p>
                </div>
            </div>
        )
    }
}

class FarmCarousel extends Component {

    state = {};

    componentDidMount() {
        fetch('/api/users')
            .then(response => response.json())
            .then(user => {
                let helperArray = [];

                for (let i = 0; i < 2; i++) {
                    let obj = user[i];
                    if(obj.userType === 'FARM') {
                        helperArray.push(<CarouselItem key={obj.id} item={obj}/>);
                    }
                }

                this.setState({carouselItemList: helperArray});

            });
    }

    render() {
        return (
            <div className="carouselcontainer">
                <h2>Tuottajat</h2>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">

                    <div className="carousel-inner">
                        <div className="item active">
                            <Link to="/">
                                <img src={logo1} alt="Porkkana" />
                            </Link>
                            <div className="carousel-caption">
                                <h3>Tervetuloa lähiruokasivulle</h3>
                                <p>On aika siistii et löysit tänne. Tervetuloa!</p>
                            </div>
                        </div>

                        {this.state.carouselItemList}
                    </div>

                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default FarmCarousel;