import logo from './logo.svg';
import './App.css';
import { usePapaParse } from 'react-papaparse';
import { useEffect, useState, useCallback } from 'react';

const App = () => {
  const { readString } = usePapaParse();
  const [data, setData] = useState([]);
  const [lastModified, setLastModified] = useState('0');

  const fetchFile = useCallback(async () => {
    const res = await fetch('/react-gh-website/data/data_file.csv');
    const csvRestoJson = readString(await res.text(), {
      header: true,
    }).data;
    const lm = res.headers.get('last-modified');
    if (new Date(lm) > new Date(lastModified)) {
      setLastModified(lm);
      setData(csvRestoJson);
    }
  }, [readString, lastModified]);

  useEffect(() => {
    fetchFile();
    // run every 5 minuted
    const fetchAPITimer = setInterval(() => {
      fetchFile();
    }, 1000 * 30);

    return () => {
      clearInterval(fetchAPITimer);
    };
  }, [fetchFile]);

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
          Last modified - {lastModified}
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
