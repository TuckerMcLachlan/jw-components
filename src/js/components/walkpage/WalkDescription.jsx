import React from 'react';

const WalkDescription = ({longDescription}) => (
  <section className="walkDescription">
    <a name="About This Walk"></a>
    <h2>About This Walk</h2>
    <article dangerouslySetInnerHTML={{__html: longDescription}}></article>
  </section>
);

WalkDescription.propTypes = {
  longDescription: React.PropTypes.string.isRequired,
};

export default WalkDescription;