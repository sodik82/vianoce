/* globals $ */
import React, { Component } from 'react';

import EasterEgg from './EasterEgg';

class Snezenie extends Component {
  render() {
    return (
      <div className="ground snowCollection">
        <EasterEgg className="photo snowCollection" position={{bottom: 0, left: '50px'}}>
          <img alt="2016" src="https://lh3.googleusercontent.com/A-e4LyV3JXnEiZRjt_36va-pC7Q_veN6D9PH3iBxghQpSP9THHopn3XCUv2sst3Adbj1gy_NrP3vDfroaDOw8wNn0DcrWSrrsCd4ui5v4qCwQnTBn4OOSA1x4DE1b6bRbi8YkObXOsFSvuGa2Xdv40hrO6II8vQIwP4udhnvjjy6afwwRY0vkoS_50KGtQ2jfbRqt75bJoaKj7h880nH1IWCSdoEWZS8cpAkIyjTBKVd33yLPi5ZWtBbM4XS6NiGUa1O5iq3KF8vigmH1BQx3J0HGkJsKT2PaYmBJ5o_yuFfXNZy9yfWshsiJF8dk0RZh72grzCaSOwkbyRfieUs7kQeRIloAa78nwWtnHrbtz40gmBHh8m8r4Pd83oPkvviCjVQwlFQoy4WxYMZKD0iOW40DIBFG1F9YDEWg_ew4jvMYjxpuE_wr7Gk9QHcILTa1e2f8uAVKhdnXRKm_3JYidqYZnsHSlzHmFeDkihsfpoM_Ib-kQFRkErZITm0QNGK307GqloN5ms0V_0X5SlVW3PEKsQJn5UmlFq3mViKFyDh6QA8vvQ2RCiPQpPD80T_T04Dy7PtYACkVrL3eBALq8QF9t27qtRL7MOQpVtzWAtgtmCMiaHgG5CzRB1rZM4eTybmBKJm05s17HTuWP8JFqURMkrcMeko7cg-lmigVg=w408-h272-no"/>
        </EasterEgg>
      </div>
    );
  }

  componentDidMount() {
    $(document).snowfall({collection : '.snowCollection', flakeCount : 250});
  }
}

export default Snezenie;
