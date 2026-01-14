import { Table } from 'react-bootstrap';
import FileRow from './FileRow';

const FilesTable = ({ files }) => {

    return (
        <Table striped bordered hover responsive className="mt-4 shadow-sm">
            <thead className="bg-light">
                <tr>
                    <th>File Name</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                </tr>
            </thead>
            <tbody>
                {files.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center">No data found</td>
                    </tr>
                ) : (
                    files.map((fileObj) => (
                        fileObj.lines.map((line, index) => (
                            <FileRow
                                key={`${fileObj.file}-${index}`}
                                file={fileObj.file}
                                line={line}
                            />
                        ))
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default FilesTable;
