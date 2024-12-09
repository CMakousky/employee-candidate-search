import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { ImCross } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToWatchList?: (() => void) | null;
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
  onWatchList,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate.name ? (
        <section className='candidateCard'>
          <figure>
            <img src={`${currentCandidate.avatar_url}`} alt={`${currentCandidate.name}`} />
          </figure>
          <article className='details'>
            <h2>{currentCandidate.name}</h2>
          </article>

          {onWatchList ? (
            <aside className='icons'>
              <ImCross
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onWatchList,
                    currentCandidate.name
                  )
                }
              />
            </aside>
          ) : (
            <aside className='icons'>
              <CgPlayListAdd
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToWatchList?.()}
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
