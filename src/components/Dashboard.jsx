import React from 'react';
import About from './About';
import GenerateGraph from './GenerateGraph';
import SideMenu from './SideMenu';
import Modal from './Modal';
import MainPanel from './MainPanel';
import Importer from '../lib/importer';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalTitle: '',
      importError: null,
      modalType: '',
    };

    this.dataImport = (rawText) => {
      const importResults = Importer.importRawData(rawText);
      if (importResults.success) {
        this.setState({
          data: importResults.data,
        });
      } else {
        this.setState({
          modalType: 'error',
          modalTitle: 'Import Error',
          importError: importResults.error,
        });
      }
    };

    this.setData = (data) => {
      this.setState({
        data,
        modalType: '',
      });
    };

    this.openAbout = () => {
      this.setState({
        modalTitle: 'About',
        importError: null,
        modalType: 'about',
      });
    };

    this.openDemo = () => {
      this.setState({
        modalTitle: 'Generate Graph',
        importError: null,
        modalType: 'demo',
      });
    };

    this.clear = () => {
      this.setState({
        data: null,
      });
    };

    this.dismissModal = () => {
      this.setState({
        modalType: '',
      });
    };
  }

  getModalBody() {
    const { importError, modalType } = this.state;
    switch (modalType) {
      case 'error':
        break;
      case 'demo':
        return <GenerateGraph setData={this.setData} />;
      case 'about':
      default:
        return <About />;
    }

    let errorMessage;
    const sampleData = '1 5.0\n2 12.2\n3 18.2\n4 31.2\n5 59.2';
    if (typeof importError === 'string') {
      errorMessage = `There was a problem reading data from clipboard: ${importError}`;
    } else if (typeof importError.message === 'string') {
      errorMessage = `There was a problem reading data from clipboard: ${importError.message}`;
    } else {
      errorMessage = 'There was a problem reading data from clipboard';
    }
    return (
      <>
        <span>{errorMessage}</span>
        <p>Try copying the data below to get started</p>
        <pre>{sampleData}</pre>
      </>
    );
  }

  render() {
    const { data, modalType, importError, modalTitle } = this.state;
    const hasData = data !== null;
    return (
      <div className="h-100 bg-light">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow d-flex justify-content-center">
          <div className="header navbar-brand col-2 mr-0 flex-fill">Grapher</div>
        </nav>
        <div className="container-fluid main d-flex flex-column h-100">
          <div className="row h-100 d-block d-sm-none">
            <div className="alert alert-warning m-2" role="alert">
              Warning! This demo does not work on small screens.
            </div>
          </div>
          <div className="row h-100 d-none d-sm-flex">
            <div className="col-3 p-0 h-100">
              <SideMenu
                dataImport={this.dataImport}
                clear={this.clear}
                hasData={hasData}
                openDemo={this.openDemo}
                openAbout={this.openAbout}
              />
            </div>
            <div className="col-9 bg-white">
              <MainPanel data={data} />
            </div>
          </div>
        </div>
        {modalType && (
          <>
            <Modal
              title={modalTitle}
              dismiss={this.dismissModal}
              isError={!!importError}
            >
              {this.getModalBody()}
            </Modal>
            <div className="modal-backdrop fade show" />
          </>)
        }
      </div>
    );
  }
}

export default Dashboard;
