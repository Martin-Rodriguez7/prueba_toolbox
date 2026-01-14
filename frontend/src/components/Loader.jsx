import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center p-5">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
