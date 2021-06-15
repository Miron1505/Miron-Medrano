const indexImage = require('../images/mobileApp.png');

export const Inicio = () => {
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h3><strong>Interconectividad</strong></h3>
                        <p className="text-break mt-3">
                            La noción, de uso frecuente en el terreno de la informática, se vincula a la comunicación entre dos o más redes. Gracias a la interconectividad, es posible compartir recursos, superar la limitación de los nodos y acceder de forma instantánea a las bases de datos que se encuentran compartidas.
                        </p>
                        <p className="text-break mt-3">
                            La interconectividad de redes es la capacidad de establecer conexiones internas y enlazar dos sistemas o dispositivos entre sí. "Inter" significa "entre" en inglés, y "red” hace referencia a un conjunto de equipos informáticos que se conectan usando un medio para la transmisión de información.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src={indexImage.default} alt="indexImage"/>
                    </div>
                </div>
            </div>
        </div>
    )
}