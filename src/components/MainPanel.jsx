import React from 'react';
import GrapherContainer from './GrapherContainer';
import DataTable from './DataTable';

class MainPanel extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="h-100 d-flex flex-column">
        <GrapherContainer data={data} />
        <DataTable data={data} />
      </div>
    );
  }
}

export default MainPanel;
