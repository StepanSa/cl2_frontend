import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [matches, setMatches] = useState([]);
    const [teamHome, setTeamHome] = useState('');
    const [teamAway, setTeamAway] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [scoreHome, setScoreHome] = useState(0);
    const [scoreAway, setScoreAway] = useState(0);

    // Function to fetch all matches
    const fetchMatches = async () => {
        try {
            const response = await axios.get('http://54.89.130.1:5000/matches');
            setMatches(response.data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    // Fetch matches when the component loads
    useEffect(() => {
        fetchMatches();
    }, []);

    // Function to add a new match
    const handleAddMatch = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://54.89.130.1:5000/matches', {
                team_home: teamHome,
                team_away: teamAway,
                match_date: matchDate,
                score_home: scoreHome,
                score_away: scoreAway,
            });

            // Refresh the list of matches after adding a new one
            fetchMatches();

            // Clear the form fields
            setTeamHome('');
            setTeamAway('');
            setMatchDate('');
            setScoreHome(0);
            setScoreAway(0);
        } catch (error) {
            console.error("Error adding match:", error);
        }
    };

    return (
        <div>
            <h1>Football Matches</h1>

            <form onSubmit={handleAddMatch}>
                <input
                    type="text"
                    placeholder="Home Team"
                    value={teamHome}
                    onChange={(e) => setTeamHome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Away Team"
                    value={teamAway}
                    onChange={(e) => setTeamAway(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Match Date"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Home Team Score"
                    value={scoreHome}
                    onChange={(e) => setScoreHome(Number(e.target.value))}
                    required
                />
                <input
                    type="number"
                    placeholder="Away Team Score"
                    value={scoreAway}
                    onChange={(e) => setScoreAway(Number(e.target.value))}
                    required
                />
                <button type="submit">Add Match</button>
            </form>

            <h2>All Matches:</h2>
            <ul>
                {matches.map(match => (
                    <li key={match.id}>
                        <strong>{match.team_home} vs {match.team_away}</strong> - Date: {match.match_date} | Score: {match.score_home} - {match.score_away}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
