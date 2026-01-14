import React, { useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilesList, setSelectedFileName, fetchFilesData } from '../store/slices/filesSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const { list, selectedFileName, loadingList } = useSelector((state) => state.files);

    useEffect(() => {
        dispatch(fetchFilesList());
    }, [dispatch]);

    const handleFilterChange = (e) => {
        const fileName = e.target.value;
        dispatch(setSelectedFileName(fileName));
        // recargamos la data con el filtro aplicado
        dispatch(fetchFilesData(fileName));
    };

    return (
        <Form className="mb-4">
            <Row>
                <Col md={6}>
                    <Form.Group controlId="fileNameFilter">
                        <Form.Label>Filter by File Name</Form.Label>
                        <Form.Select
                            value={selectedFileName}
                            onChange={handleFilterChange}
                            disabled={loadingList}
                        >
                            <option value="">All Files</option>
                            {list && list.map((file) => (
                                <option key={file} value={file}>
                                    {file}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBar;
