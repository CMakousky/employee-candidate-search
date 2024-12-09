import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    // name: '',
    // username: '',
    // location: '',
    // avatar: '',
    // email: '',
    // html_url: '',
    // company: '',
  } as Candidate);

  const addToPotentialCandidates = () => {
    let parsedPotentialCandidates: Candidate[] = [];
    const storedPotentialCandidates = localStorage.getItem('potentialCandidates');
    if (typeof storedPotentialCandidates === 'string') {
      parsedPotentialCandidates = JSON.parse(storedPotentialCandidates);
    }
    parsedPotentialCandidates.push(currentCandidate);
    localStorage.setItem('potentialCandidates', JSON.stringify(parsedPotentialCandidates));
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

  let index:number;
  const storedIndex = localStorage.getItem('storedIndex');
  if (typeof storedIndex === 'string') {
    index = JSON.parse(storedIndex) as number;
  } else {index = 0};

  const nextCandidate = async (index:number) => {
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

  return (
    <>
      <button onClick={() => generateCandidates()}>Generate Candidates</button>
      <button onClick={() => nextCandidate(index)}>Next Candidate</button>
      <button onClick={() => clearLocalStorage()}>Clear Local Storage</button>
      <h1>CandidateSearch</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToWatchList={addToPotentialCandidates}
      />
    </>
  );
};

export default CandidateSearch;
