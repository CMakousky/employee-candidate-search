import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({} as Candidate);

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

    let parsedPotentialCandidates: Candidate[] = [];
    data1.forEach((element) => {
      const storedPotentialCandidates = localStorage.getItem('potentialCandidates');
      if (typeof storedPotentialCandidates === 'string') {
        parsedPotentialCandidates = JSON.parse(storedPotentialCandidates);
      }
      parsedPotentialCandidates.push(element);
      localStorage.setItem('potentialCandidates', JSON.stringify(parsedPotentialCandidates));
    });

    setCurrentCandidate(data1[0]);
    console.log(currentCandidate);
  };

  const nextCandidate = async () => {
    let index:number;
    const storedIndex = localStorage.getItem('storedIndex');
    if (typeof storedIndex === 'string') {
      index = JSON.parse(storedIndex) as number;
    } else {index = 0};

    index++;

    let parsedPotentialCandidates: Candidate[] = [];

    const storedPotentialCandidates = localStorage.getItem('potentialCandidates');
    if (typeof storedPotentialCandidates === 'string') {
      parsedPotentialCandidates = JSON.parse(storedPotentialCandidates);
    }

    setCurrentCandidate(parsedPotentialCandidates[index]);
    console.log(currentCandidate);

    localStorage.setItem('storedIndex', JSON.stringify(index));
    console.log(index);
  };

  const clearLocalStorage = async () => {
    localStorage.clear();
    console.log("Local Storage Cleared!");
  };

  useEffect(() => {
    // const parsedSavedCandidates = JSON.parse(
    //   localStorage.getItem('savedCandidates') as string
    // );
    // setSavedCandidates(parsedSavedCandidates);

    let index:number;
    const storedIndex = localStorage.getItem('storedIndex');
    if (typeof storedIndex === 'string') {
      index = JSON.parse(storedIndex) as number;
    } else {index = 0};

    // index++;

    let parsedPotentialCandidates: Candidate[] = [];

    const storedPotentialCandidates = localStorage.getItem('potentialCandidates');
    if (typeof storedPotentialCandidates === 'string') {
      parsedPotentialCandidates = JSON.parse(storedPotentialCandidates);
    }
    if (parsedPotentialCandidates.length > 0) {setCurrentCandidate(parsedPotentialCandidates[index]);}
    // setCurrentCandidate(parsedPotentialCandidates[index]);
    console.log(currentCandidate);

    localStorage.setItem('storedIndex', JSON.stringify(index));
    console.log(index);
  }, []);

  return (
    <>
      <aside>
        <button onClick={() => generateCandidates()}>Generate Candidates</button>
        {/* <button onClick={() => nextCandidate()}>Next Candidate</button> */}
        <button onClick={() => clearLocalStorage()}>Clear Local Storage</button>
      </aside>
      <h1>CandidateSearch</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToWatchList={addToSavedCandidates}
        rejectCandidate={nextCandidate}
      />
    </>
  );
};

export default CandidateSearch;
