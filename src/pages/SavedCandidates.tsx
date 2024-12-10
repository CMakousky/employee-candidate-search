import type React from 'react';
import { useEffect, useState } from 'react';
import CandidatesToSave from '../components/CandidatesToSave';
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const removeFromStorage = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    currentlyOnWatchList: boolean | null | undefined,
    title: string | null
  ) => {
    e.preventDefault();
    if (currentlyOnWatchList) {
      let parsedSavedCandidates: Candidate[] = [];
    
      const savedCandidates = localStorage.getItem('savedCandidates');
      if (typeof savedCandidates === 'string') {
        parsedSavedCandidates = JSON.parse(savedCandidates);
      }
      parsedSavedCandidates = parsedSavedCandidates.filter(
        (candidate) => candidate.login !== title
      );
      setSavedCandidates(parsedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
    } 
  };

    useEffect(() => {
      const parsedSavedCandidates = JSON.parse(
        localStorage.getItem('savedCandidates') as string
      );
      setSavedCandidates(parsedSavedCandidates);
    }, []);
  
  return (
    <>
      <h1 className='pageHeader'>Potential Candidates</h1>
      {(!savedCandidates?.length || savedCandidates?.length === 0) ? (
        <h1 style={{ margin: '16px 0' }}>Add candidates to your hiring list.</h1>
      ) : (
        <CandidatesToSave
          candidatesToSave={savedCandidates}
          removeFromStorage={removeFromStorage}
        />
      )}
    </>
  );
};

export default SavedCandidates;
