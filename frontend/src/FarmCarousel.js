import React, {Component} from "react";
import './css/FarmCarousel_style.css';
import logo1 from './carrot.jpeg';
import logo2 from './tomato.jpeg';
import logo3 from './wheat.jpeg';

class CarouselItem extends Component {
    render() {
        return (
            <div className="item">
                <a href="http://www.bing.com">
                    <img src={logo3} alt="Vehnä"/>
                </a>
                <div className="carousel-caption">
                    <h3>{this.props.item.companyName}</h3>
                    <p>Täällä on tuotteita, esim.</p>
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
                    console.log(obj);
                    helperArray.push(<CarouselItem key={obj.id} item={obj}/>);
                }

                this.setState({carouselItemList: helperArray});

            });
    }

    render() {
        return (
            <div className="carouselcontainer">
                <h2>Tuottajat</h2>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="item active">
                            <a href="http://www.google.com">
                                <img src={logo1} alt="Porkkana" />
                            </a>
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