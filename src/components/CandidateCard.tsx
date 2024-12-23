import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToWatchList?: (() => void) | null;
  rejectCandidate?: (() => void) | null;
  onWatchList?: boolean | null;
  removeFromStorage?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnWatchList: boolean | null | undefined,
        name: string | null
      ) => void)
    | null;
};

const CandidateCard = ({
  currentCandidate,
  addToWatchList,
  rejectCandidate,
  onWatchList,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate.login ? (
        <section className='candidateCard'>
          <figure>
            <img src={`${currentCandidate.avatar_url}`} alt={`${currentCandidate.name}`} />
          </figure>
          <article className='details'>
            <h2>{`Name: ${currentCandidate.name}`}</h2>
            <h2>{`Username: ${currentCandidate.login}`}</h2>
            <h2>{`Location: ${currentCandidate.location}`}</h2>
            <h2>{`Email: ${currentCandidate.email}`}</h2>
            <h2>{`HTML URL: ${currentCandidate.html_url}`}</h2>
            <h2>{`Company: ${currentCandidate.company}`}</h2>
          </article>

          {onWatchList ? (
            <aside className='icons'>
              <AiOutlineMinusCircle
                style={{ fontSize: '100px', cursor: 'pointer' }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onWatchList,
                    currentCandidate.login
                  )
                }
              />
            </aside>
          ) : (
            <aside className='icons'>
              <AiOutlinePlusCircle
                style={{ fontSize: '100px', cursor: 'pointer' }}
                onClick={() => addToWatchList?.()}
              />
              <AiOutlineMinusCircle
                style={{ fontSize: '100px', cursor: 'pointer' }}
                onClick={() => rejectCandidate?.()}
              />
            </aside>
          )}
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}>Please search for an employee candidate.</h1>
      )}
    </>
  );
};

export default CandidateCard;
