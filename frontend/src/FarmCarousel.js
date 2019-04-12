import React, {Component} from "react";
import './css/FarmCarousel_style.css';
import logo1 from './carrot.jpeg';
import logo2 from './tomato.jpeg';
import logo3 from './wheat.jpeg';
import {Link} from "react-router-dom";

class CarouselItem extends Component {
    render() {
        return (
            <div className="carousel-item">
                <Link to={"/profiili/" + this.props.item.id}><img src={logo3} alt="Vehnä"/></Link>
                <div className="carousel-caption d-none d-md-block">
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
            .then(users => {
                let helperArray = [];

                for (let obj of users) {
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
                        <div className="carousel-item active">
                            <Link to="/">
                                <img src={logo1} alt="Porkkana" />
                            </Link>
                            <div className="carousel-caption d-none d-md-block">
                                <h3>Tervetuloa lähiruokasivulle</h3>
                                <p>On aika siistii et löysit tänne. Tervetuloa!</p>
                            </div>
                        </div>

                        {this.state.carouselItemList}
                    </div>

                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default FarmCarousel;