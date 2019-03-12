import React, {Component} from "react";
import './css/FarmCarousel_style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FarmCarousel extends Component {

    state = {};

    render() {
        return (
            <div className="container">
                <h2>Tuottajat</h2>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="https://static-sls.smf.aws.sanomacloud.net/etlehti.fi/s3fs-public/styles/large_main_image/public/main_media/istock-492528035.jpg" alt="Porkkana" />
                            <div className="carousel-caption">
                                <h3>Esimerkki tila</h3>
                                <p>Täällä on tuotteita, esim.</p>
                            </div>
                        </div>

                        <div className="item">
                            <img src="https://im.mtv.fi/image/6543764/landscape16_9/1024/576/524dd1d3d4112469b607331c06a01027/ih/porkkana.jpg" alt="Punajuuri"/>
                            <div className="carousel-caption">
                                <h3>Mummolan tila</h3>
                                <p>Täällä on tuotteita, esim.</p>
                            </div>
                        </div>

                        <div className="item">
                            <img src="http://www.satokausikalenteri.fi/files/viikon-kasvikset/peruna2.jpg" alt="Peruna"/>
                            <div className="carousel-caption">
                                <h3>Mielen tila</h3>
                                <p>Täällä on tuotteita, esim.</p>
                            </div>
                        </div>
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