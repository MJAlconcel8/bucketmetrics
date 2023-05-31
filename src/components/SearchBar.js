import React from 'react';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import '../styles/SearchBar.css';

export class SearchBar extends React.Component {
  state = {
    searchQuery: '',
    searchResults: [],
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchQuery: value }, () => {
      this.handleSearch();
    });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;

    if (searchQuery) {
      const searchResults = nba.searchPlayers(searchQuery).map(
        ({ full_name, player_id }) => ({
          full_name,
          player_id,
          profile_pic: `${PROFILE_PIC_URL_PREFIX}/${player_id}.png`,
        })
      );
      this.setState({ searchResults });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  handleSelectPlayer = (playerName) => {
    this.props.loadPlayerInfo(playerName);
  };

  renderSearchResults = () => {
    const { searchResults } = this.state;

    if (searchResults.length === 0) {
      return null;
    }

    return (
      <ul className="search-results">
        {searchResults.map(({ full_name, player_id, profile_pic }) => (
          <li
            key={player_id}
            className="search-result"
            onClick={() => this.handleSelectPlayer(full_name)}
          >
            <img
              className="player-option-image"
              src={profile_pic}
              alt={full_name}
            />
            <span className="player-option-label">{full_name}</span>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search NBA players"
          value={searchQuery}
          onChange={this.handleInputChange}
        />
        {this.renderSearchResults()}
      </div>
    );
  }
}


