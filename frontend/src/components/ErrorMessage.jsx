import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
    return (
        <Alert variant="danger" className="m-3">
            {message}
        </Alert>
    );
};

export default ErrorMessage;
