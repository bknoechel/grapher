import React from 'react';

class DataTable extends React.PureComponent {
  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }

    const length = 0 || (data && data.x && data.x.length);
    const tableRows = [];
    for (let i = 0; i < length; i++) {
      tableRows.push(
        <tr key={i}>
          <td>{data.x[i]}</td>
          <td>{data.y[i]}</td>
        </tr>,
      );
    }

    return (
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">x</th>
              <th scope="col">y</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
