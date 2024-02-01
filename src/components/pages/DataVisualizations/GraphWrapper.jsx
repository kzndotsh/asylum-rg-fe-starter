import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  if (!view) {
    view = 'time-series';
    set_view(view);
  }
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    const queryParams = {
      from: years[0],
      to: years[1],
    };

    if (office && office !== 'all') {
      queryParams.office = office;
    }

    const fetchData = async (path, queryParams) => {
      const url = `https://hrf-asylum-be-b.herokuapp.com/cases/${path}`;
      const response = await axios.get(url, { params: queryParams });
      return response.data;
    };

    const fiscalSummary = await fetchData('fiscalSummary', queryParams);
    const citizenshipSummary = await fetchData(
      'citizenshipSummary',
      queryParams
    );

    fiscalSummary.citizenshipResults = citizenshipSummary;
    stateSettingCallback(view, office, [fiscalSummary]);
  }

  const viewComponentMap = {
    'time-series': office ? (
      <TimeSeriesSingleOffice office={office} />
    ) : (
      <TimeSeriesAll />
    ),
    'office-heat-map': !office && <OfficeHeatMap />,
    citizenship: office ? (
      <CitizenshipMapSingleOffice office={office} />
    ) : (
      <CitizenshipMapAll />
    ),
  };

  const MapToRender = viewComponentMap[view] || null;

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {MapToRender}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={() => dispatch(resetVisualizationQuery(view, office))}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
