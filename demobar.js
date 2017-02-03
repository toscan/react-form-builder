import React from "react";
import ElementStore from './src/stores/ElementStore';
import ReactFormGenerator from './src/form';

export default class Demobar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false
    }

    ElementStore.listen(this._onChange.bind(this));
  }

  showPreview() {
    this.setState({
      previewVisible: true
    })
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true
    })
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false
    })
  }

  _onChange(data) {
    this.setState({
      data: data
    });
  }
  
  render() {
    var modalClass = 'modal';
    if(this.state.previewVisible) {
      modalClass += ' show';
    }

    var shortModalClass = 'modal short-modal';
    if(this.state.shortPreviewVisible) {
      shortModalClass += ' show';
    }

    return(
      <div className="clearfix" style={{margin:'10px', width:'70%'}}>
        <h4 className="pull-left">Preview</h4>
        <button className="btn btn-primary pull-right" style={{ marginRight: '10px'}} onClick={this.showPreview.bind(this)}>Preview Form</button>
        <button className="btn btn-default pull-right" style={{ marginRight: '10px'}} onClick={this.showShortPreview.bind(this)}>Alternate/Short Form</button>
        
        { this.state.previewVisible &&
          <div className={modalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator download_path="" back_action="/" answer_data={{}} form_action="/" form_method="POST" data={this.state.data} />
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }

        { this.state.shortPreviewVisible &&
          <div className={shortModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator download_path="" back_action="" answer_data={{}} form_action="/" form_method="POST" data={this.state.data} display_short={true} hide_actions={true} />
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }

}