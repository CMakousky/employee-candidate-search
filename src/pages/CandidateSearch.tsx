// import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { useState, useEffect, FormEvent } from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  //Establish useState for currentCandidate and the searchInput text field
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({} as Candidate);
  const [searchInput, setSearchInput] = useState<string>('');

  //Function to add the currently displayed user to the savedCandidates list
  const addToSavedCandidates = () => {
    let parsedSavedCandidates: Candidate[] = [];
    //Retrieve savedCandidates from localStorage
    const savedCandidates = localStorage.getItem('savedCandidates');
    //Parse savedCandidates as JSON if a string was retrieved from localStorage
    if (typeof savedCandidates === 'string') {
      parsedSavedCandidates = JSON.parse(savedCandidates);
    }
    //Push the currentCandidate into the parsedSavedCandidates array
    parsedSavedCandidates.push(currentCandidate);
    //Place the parsedSavedCandidates array into localStorage as savedCandidates
    localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
    //Call the nextCandidate function to change the displayed user
    nextCandidate();
  };

  //Retrieve an array of data on GitHub users based on a random start date
  const generateCandidates = async () => {
    const data1: Candidate[] = await searchGithub();
    let parsedGithubData: Candidate[] = [];

    //Push each element of the data1 array onto the end of the parsedGithubData array
    data1.forEach((element) => {
      const storedGithubData = localStorage.getItem('githubData');
      if (typeof storedGithubData === 'string') {
        parsedGithubData = JSON.parse(storedGithubData);
      }
      parsedGithubData.push(element);
      //Place the new parsedGithubData into localStorage as githubData
      localStorage.setItem('githubData', JSON.stringify(parsedGithubData));
    });
    //Set the currently displayed user to the 0th element of the data1 array
    setCurrentCandidate(data1[0]);
    console.log(currentCandidate);
  };

  //Function that uses a text input to search for a GitHub user
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
      //Display the last displayed profile if applicable
      if (parsedGithubData.length > 0) {
        setCurrentCandidate(parsedGithubData[index]);
      } else {
        //Call the generateCandidates function if there is no previous profile to display and the user provided an empty text input
        generateCandidates();
      }
    } else {
      //Search for a GitHub user by username, and then display the results
      const data2: Candidate = await searchGithubUser(username);
      setCurrentCandidate(data2)
    };
  };

  //Function to display the next user profile retrieved from GitHub
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

  //Apply the following effect on page load
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
