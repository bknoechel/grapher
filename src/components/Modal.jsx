import React from 'react';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.modalContent = React.createRef();
    this.state = {
      mountId: null,
      dismissId: null,
    };

    this.dismiss = () => {
      this.modal.current.classList.remove('show');
      const dismissId = setTimeout(() => {
        props.dismiss();
      }, 150);
      this.setState({
        dismissId,
      });
    };

    this.mouseDownHandler = (evt) => {
      if (this.modalContent.current.contains(evt.target)) {
        return;
      }

      this.dismiss();
    };
  }

  componentDidMount() {
    const mountId = setTimeout(() => {
      this.modal.current.classList.add('show');
    }, 50);
    this.setState({
      mountId,
    });
    document.addEventListener('mousedown', this.mouseDownHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.mouseDownHandler, false);
    const { mountId, dismissId } = this.state;
    clearTimeout(mountId);
    clearTimeout(dismissId);
  }

  render() {
    const {
      children,
      title,
      isError = false,
    } = this.props;

    return (
      <div className="modal fade" tabIndex="-1" role="dialog" ref={this.modal} style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content" ref={this.modalContent}>
            <div className="modal-header">
              {isError ? <h5 className="modal-title text-danger">{title}</h5>
                : <h5 className="modal-title">{title}</h5>
              }
              <button type="button" className="close" aria-label="Close" onClick={this.dismiss}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.dismiss}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
