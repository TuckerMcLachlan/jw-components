import React from 'react';

import WalksFilter from './WalksFilter.jsx';
import WalksMap from './WalksMap.jsx';
import DashboardStore from './DashboardStore';
import DashboardActions from './DashboardActions';
//TODO: (Post-PR) Walk common component found in <Itinerary/> and <WalkPage/>, Refactor to a single component or mixin
import Walk from './Walk.jsx';

//TODO: Discuss: Not sure on the precedent of this naming: a dashboard (or rather, the profile page) can potentially be shown for other users. The dash store should show the walks for the profile's owner, not necessarily "my" walks.

//Walks is required before activeFilters to reset activeFilters
const getWalks = (props) => ({
  walks: props.walks || DashboardStore.getWalks(props.location),
  activeFilters: props.activeFilters || DashboardStore.getActiveFilters(),
  filterByDate: props.filterByDate || DashboardStore.getDateFilter(),
});

export default class Walks extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = getWalks(props);
    this.state.currentView = 'list';
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    DashboardStore.addChangeListener( this._onChange );
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener( this._onChange );
  }

  //This is required to capture updated routing (indicating which type of walks to retrieve)
  componentWillReceiveProps(props) {
    this.setState(getWalks(props));
  }

  _onChange() {
    this.setState(getWalks(this.props));
  }

  render() {
    const {currentView, walks} = this.state;
    const filters = DashboardStore.getFilters();
    const filterByDate = DashboardStore.getDateFilter()
    //TODO*: Issue with walks for single user, correct and update PR
    const Walks = walks.map(({map, id, title, time, team, url}) =>
      <Walk
        title={title}
        meeting={map.markers[0].title}
        start={time.slots[0][0]}
        id={id}
        key={id}
        team={team}
        url={url}
      />
    );

    //TODO: (Post-PR) Place buttons in WalksFilterOptions (should be a generic FilterOptions)
    return (<div className="cityWalks">
      <button onClick={() => this.setState({currentView: 'list'})}>List</button>
      <button onClick={() => this.setState({currentView: 'map'})}>Map</button>
      { filterByDate ==='all' ? <button onClick={() => DashboardActions.filterByDate('future')}>Hide Past Walks</button> : <button onClick={()=>DashboardActions.filterByDate('all')}>Show All Walks</button>}
      <button onClick={() => window.open(DashboardStore.generateCSV())}>Export Spreadsheet</button>
      <WalksFilter
        {...this.state}
        {...this.props}
        filters={filters}
        {...DashboardActions}
      />
      {currentView === 'list' ? Walks : <WalksMap {...this.state} />}
    </div>);
  }
}

Walks.PropTypes = {
  walks: React.PropTypes.array.isRequired,
  activeFilters: React.PropTypes.array.isRequired,
  filterByDate: React.PropTypes.string.isRequired,
};