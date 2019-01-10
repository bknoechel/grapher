import React from 'react';
import Footer from './Footer';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPasteEvent: false,
      showWarning: false,
    };

    this.handlePaste = async (evt) => {
      this.setState({
        userPasteEvent: true,
      });
      const { dataImport } = this.props;
      const { clipboardData } = evt;
      const text = clipboardData.getData('text');
      dataImport(text);
    };

    this.handleChange = async () => {
      const { userPasteEvent } = this.state;
      if (userPasteEvent) {
        this.setState({
          userPasteEvent: false,
          showWarning: false,
        });
      } else {
        this.setState({
          showWarning: true,
        });
      }
    };

    this.dismissWarning = () => {
      this.setState({ showWarning: false });
    };
  }

  render() {
    const {
      clear,
      hasData,
      openAbout,
      openDemo,
    } = this.props;
    const {
      showWarning,
    } = this.state;

    const noDataElt = !hasData && (
      <>
        <div className="card border-dark mb-3">
          <div className="card-header">Graph Data</div>
          <div className="card-body">
            <p className="card-text">Click below to generate graphs</p>
            <button type="button" className="btn btn-primary" onClick={openDemo}>Generate</button>
            <p className="card-text mt-3">
              Make your own graph by copying data, then pasting below
            </p>
            <input
              type="text"
              className="form-control"
              placeholder="Paste here"
              onPaste={this.handlePaste}
              value=""
              onChange={this.handleChange}
            />
            {showWarning && (
              <div className="alert alert-warning alert-dismissible mt-3" role="alert">
                <span>Copy and paste tabular data instead of typing.</span>
                <button type="button" className="close" onClick={this.dismissWarning}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
    const clearDataElt = hasData && (
      <button type="button" className="btn btn-secondary mb-3" onClick={clear}>Clear Data</button>
    );

    return (
      <div className="flex-column bg-light h-100 px-3 sidemenu d-flex">
        <button type="button" className="btn btn-outline-primary mb-3" onClick={openAbout}>About</button>
        {noDataElt}
        {clearDataElt}
        <div className="flex-fill" />
        <Footer />
      </div>
    );
  }
}

export default SideMenu;
