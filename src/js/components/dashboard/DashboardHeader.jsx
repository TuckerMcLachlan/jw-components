import React from 'react';

const DashboardHeader = ({cityOrganizer, blogUrl, name, post}) => {
  return (
    <header>
      <h3>{name.toUpperCase()} Organizer Dashboard</h3>
      <h4>Hi, {`${cityOrganizer.firstName}!`} </h4>
      <section className="dashboardLatestPost">
        <h4>Latest Blog Post</h4>
        <h1><a href={post.url}>{post.name}</a></h1>
        <a href={`mailto:${cityOrganizer.email}?subject=${encodeURI(`I would like to submit a story to the ${name} blog`)}`}><button>Share My Story</button></a>
        <a href={`http://janeswalk.org/canada/${name}/${name}-blog/`}><button>See All Posts</button></a>
      </section>
    </header>
  );
};

DashboardHeader.PropTypes = {
  cityOrganizer: React.PropTypes.object.isRequired,
  blogUrl: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  post: React.PropTypes.object.isRequired,
};

export default DashboardHeader;