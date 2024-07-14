import React from 'react';
const styles = {
  details:{
    fontSize:'12vw',
    textAlign:'center',
  }
};
const Detail = () => {
  return (
    <div className='vw-100 vh-100' id='details'>
      <h1 className='my-auto' id="details-heading" style={styles.details}>V12 Engine</h1>
    </div>
  );
}

export default Detail;
