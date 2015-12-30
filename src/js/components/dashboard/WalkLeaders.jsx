import React from 'react';
import ReactDOM from 'react-dom';
import DashboardStore from './DashboardStore';

import WalkLeader from './WalkLeader.jsx';

export default class WalkLeaders extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      //TODO: can just be generic filter
      filterByDate: props.filterByDate || 'all', // 'past' 'future' 'all'
      sortBy: props.sortBy || null, //'alpha', 'walks', ''
      activeLeaders: DashboardStore.getWalkLeadersAndVolunteers().walkLeaders || [],
    };
  }

  //TODO: Duplicate in CityWalks, perhaps create a Utility for these
  filterLeaders(filterByDate = 'all') { //TODO: We should have a common filter and list Component
    //run filters
    //run sort
    //update activeLeaders array this.setState
    //const {activeLeaders} = this.state;
    const {walkLeaders} = DashboardStore.getWalkLeadersAndVolunteers();

    if (!filterByDate.length || filterByDate === 'all') this.setState({activeLeaders: walkLeaders});
    else {
        const activeLeaders = walkLeaders.filter(leader => {
        const currentDate = Date.now();
        if (filterByDate === 'past') {
          return leader.walks.reduce((p, walk) => {
            if(p) return p;
            return walk.time.slots[0][0] * 1000 <= currentDate; //TODO: refactor into a function repeated below
          }, false);
        }
        if (filterByDate === 'future') {
          return leader.walks.reduce((p, walk) => {
            if(p) return p;
            return walk.time.slots[0][0] * 1000 >= currentDate;
          }, false);
        }
        return true; //filterByDate === 'all'
      });

      this.setState({activeLeaders, filterByDate}); //TODD: you can remove updatedLeaders, and just use activeLeaders reduce code
    }
  }

  sortLeaders(sortBy = '') {
    const {activeLeaders} = this.state;
    const {walkLeaders} = DashboardStore.getWalkLeadersAndVolunteers();

    debugger;

    if (this.state.sortBy && sortBy === this.state.sortBy) {
      this.setState({activeLeaders: walkLeaders.slice(), sortBy: null});
      return;
    }

    if (sortBy === 'alphabetical') {
      activeLeaders.sort((pLeader, cLeader)=>{
        return pLeader.firstName > cLeader.firstName;
      });
    } else { //'totalWalks'
      //run sort, setstate
      activeLeaders.sort((pLeader, cLeader)=>{
        return pLeader.walks.length < cLeader.walks.length;
      });
    }

    this.setState({activeLeaders, sortBy});
  }

  //TODO: Logic for dateFilter, only one allowed to be pressed

  render() {
    debugger;
    const {activeLeaders} = this.state;
    const {name} = DashboardStore.getCityData();

    const WalkLeaders = activeLeaders.map(wL => (<WalkLeader {...wL}/> ));

    //TODO: Show button is active for onClick
    return (<div>
      <h2>{name} Walk Leaders and Volunteers</h2>
      <h3>Show walk leaders and volunteers with...</h3>
      <button onClick={() => this.filterLeaders('past')}>Past Walks</button>
      <button onClick={() => this.filterLeaders('future')}>Upcoming Walks</button>
      <button onClick={() => this.filterLeaders()}>All Walks</button><br/>
      <button onClick={() => this.sortLeaders('alphabetical')}>Sort Alphabetically by First Name</button>
      <button onClick={() => this.sortLeaders('totalWalks')}>Sort by Most Walks</button>
      {WalkLeaders}
    </div>);
  };
}

//const WalkLeaders = ({city}) => {
//    const {walkLeaders} = city;
//
//    const WalkLeaders = walkLeaders.map(wL => (
//      <WalkLeader {...wL}/>
//    ));
//
//    return (<div>
//      <h3>Show walk leaders and volunteers with...</h3>
//      <button>Past Walks</button>
//      <button>Upcoming Walks</button>
//      <button>All Walks</button>
//      <button>Sort Alphabetically by First Name</button>
//      <button>Sort by Most Walks</button>
//      {WalkLeaders}
//    </div>);
//};

WalkLeaders.PropTypes = {
  //TODO:
};

export default WalkLeaders;