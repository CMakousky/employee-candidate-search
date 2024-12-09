import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from './CandidateCard';

interface CandidatesToSaveProps {
  candidatesToSave: Candidate[];
  removeFromStorage:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnWatchList: boolean | null | undefined,
        title: string | null
      ) => void)
    | null;
}

const CandidatesToSave = ({
  candidatesToSave,
  removeFromStorage,
}: CandidatesToSaveProps) => {
  console.log(candidatesToSave);

  return (
    <>
      <ul>
        {candidatesToSave.map((candidate) => (
          <CandidateCard
            currentCandidate={candidate}
            key={candidate.login}
            onWatchList={true}
            removeFromStorage={removeFromStorage}
          />
        ))}
      </ul>
    </>
  );
};

export default CandidatesToSave;
