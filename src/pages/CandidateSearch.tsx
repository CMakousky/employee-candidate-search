// import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { useState, useEffect, FormEvent } from 'react';
// import { searchGithub } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({} as Candidate);
  const [searchInput, setSearchInput] = useState<string>('');

  const addToSavedCandidates = () => {
    let parsedSavedCandidates: Candidate[] = [];
    const savedCandidates = localStorage.getItem('savedCandidates');

    if (typeof savedCandidates === 'string') {
      parsedSavedCandidates = JSON.parse(savedCandidates);
    }
    parsedSavedCandidates.push(currentCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));

    nextCandidate();
  };

  const generateCandidates = async () => {
    const data1: Candidate[] = await searchGithub();
    let parsedGithubData: Candidate[] = [];

    data1.forEach((element) => {
      const storedGithubData = localStorage.getItem('githubData');
      if (typeof storedGithubData === 'string') {
        parsedGithubData = JSON.parse(storedGithubData);
      }
      parsedGithubData.push(element);
      localStorage.setItem('githubData', JSON.stringify(parsedGithubData));
    });

    setCurrentCandidate(data1[0]);
    console.log(currentCandidate);
  };

  const searchForCandidateByUserName = async (event: FormEvent, username: string) => {
    event.preventDefault();
    if (username.length === 0) {
      let index:number=0;
      let parsedGithubData: Candidate[] = [];
  
      const githubDataIndex = localStorage.getItem('githubDataIndex');
      const storedGithubData = localStorage.getItem('githubData');

      if (typeof githubDataIndex === 'string') {
        index = JSON.parse(githubDataIndex) as number;
      }
      if (typeof storedGithubData === 'string') {
        parsedGithubData = JSON.parse(storedGithubData);
      }
      if (parsedGithubData.length > 0) {
        setCurrentCandidate(parsedGithubData[index]);
      } else {
        generateCandidates();
      }
    } else {
    const data2: Candidate = await searchGithubUser(username);
    setCurrentCandidate(data2)
    };
  };

  const nextCandidate = async () => {
    let index:number=0;
    let parsedGithubData: Candidate[] = [];
    const githubDataIndex = localStorage.getItem('githubDataIndex');
    const storedGithubData = localStorage.getItem('githubData');

    if (typeof githubDataIndex === 'string') {
      index = JSON.parse(githubDataIndex) as number;
    }
    if (typeof storedGithubData === 'string') {
      parsedGithubData = JSON.parse(storedGithubData);
    }
    if (parsedGithubData.length > 0) {
      index++;
      setCurrentCandidate(parsedGithubData[index]);
      console.log(currentCandidate);
    }
    localStorage.setItem('githubDataIndex', JSON.stringify(index));
    console.log(index);
  };

  useEffect(() => {
    let index:number=0;
    let parsedGithubData: Candidate[] = [];

    const githubDataIndex = localStorage.getItem('githubDataIndex');
    const storedGithubData = localStorage.getItem('githubData');

    if (typeof githubDataIndex === 'string') {
      index = JSON.parse(githubDataIndex) as number;
    }
    if (typeof storedGithubData === 'string') {
      parsedGithubData = JSON.parse(storedGithubData);
    }
    if (parsedGithubData.length > 0) {
      setCurrentCandidate(parsedGithubData[index]);
    }
    localStorage.setItem('githubDataIndex', JSON.stringify(index));
    // console.log(index);
    setCurrentCandidate({} as Candidate);
    // console.log(currentCandidate);
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>

      <section id='searchSection'>
        <form
          onSubmit={(event: FormEvent) =>
            searchForCandidateByUserName(event, searchInput)
          }
        >
          <input
            type='text'
            name=''
            id=''
            placeholder='Enter a Name'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type='submit' id='searchBtn'>
            Search
          </button>
        </form>
      </section>

      <CandidateCard
        currentCandidate={currentCandidate}
        addToWatchList={addToSavedCandidates}
        rejectCandidate={nextCandidate}
      />
    </>
  );
};

export default CandidateSearch;
