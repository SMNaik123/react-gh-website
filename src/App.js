import logo from './logo.svg';
import './App.css';
import { usePapaParse } from 'react-papaparse';
import { useEffect, useState } from 'react';

const App = () => {
  const { readString } = usePapaParse();
  const [data, setData] = useState([]);
  const [lastModified, setLastModified] = useState('0');

  useEffect(() => {
    const fetchFile = async () => {
      const res = await fetch('/react-gh-website/data/data_file.csv');
      const csvRestoJson = readString(await res.text(), {
        header: true,
      }).data;
      const lm = res.headers.get('last-modified');
      if (lastModified.length > 0 && new Date(lm) > new Date(lastModified)) {
        setLastModified(lm);
        setData(csvRestoJson);
      }
    };
    fetchFile();
    // run every 5 minuted
    const fetchAPITimer = setInterval(() => {
      fetchFile();
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(fetchAPITimer);
    };
  }, [readString]);

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
