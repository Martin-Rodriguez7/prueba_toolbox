
const FileRow = ({ file, line }) => {
    return (
        <tr>
            <td>{file}</td>
            <td>{line.text}</td>
            <td>{line.number}</td>
            <td>{line.hex}</td>
        </tr>
    );
};

export default FileRow;
