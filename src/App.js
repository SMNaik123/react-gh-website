import logo from './logo.svg';
import './App.css';
import { usePapaParse } from 'react-papaparse';
import { useEffect, useState } from 'react';

const App = () => {
  const { readRemoteFile } = usePapaParse();
  const [data, setData] = useState([]);

  useEffect(() => {
    readRemoteFile('/react-gh-website/data/data_file.csv', {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, [readRemoteFile]);

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <main>
          <ul>
            {data.map((el, i) => (
              <li key={i}>
                {el.id} - {el.Name} - {el.value}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default App;
