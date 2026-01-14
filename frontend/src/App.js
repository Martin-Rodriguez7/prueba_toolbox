import { useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FilesTable from './components/FilesTable';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import { fetchFilesData } from './store/slices/filesSlice';

function App() {
  const dispatch = useDispatch();
  const { data, loadingData, error } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchFilesData());
  }, [dispatch]);

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">React Test App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <h2 className="mb-4 border-bottom pb-2">Files Data</h2>

        <SearchBar />

        {loadingData && <Loader />}

        {error && <ErrorMessage message={error} />}

        {!loadingData && !error && <FilesTable files={data} />}
      </Container>
    </>
  );
}

export default App;
