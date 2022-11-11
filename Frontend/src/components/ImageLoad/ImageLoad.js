import React from 'react';
import ReactDOM from 'react-dom';
import './ImageLoad.css';

class ImageLoad extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
    this.imageVisible = false;
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.props.documentData.length < this.props.num) {
      this.props.documentData.push(null);
      this.props.parent.forceUpdate();
    }
  }

  setData(data) {
    this.props.documentData[this.props.num-1] = data;
    this.props.parent.forceUpdate();
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  openFileDoc () {
    if (this.ref.current.files.length !== 0) {
      let file = this.ref.current.files[0]
      let lastType = file.type.split('/')[1]
      let blob = file.slice(0, file.size, file.type);
      let newFile = new File([blob], this.props.fileName + "." + lastType, {type: file.type});
      let obj = {
        file: newFile,
        imageUrl: window.URL.createObjectURL(this.ref.current.files[0]),
      }
      this.imageVisible = true;
      this.setData(obj)
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className='image-load'>

        {this.imageVisible && this.props.documentData[this.props.num-1] !== null
        ? <img className='verification__image' alt='Изображение Вашего файла' src={ this.props.documentData[this.props.num-1] === null ? "" : this.props.documentData[this.props.num-1].imageUrl}/>
        : ""
        }

        <input id="image-load" ref={this.ref} name='loadImageInput' type="file" style={{display: 'none'}} onChange={(e)=>{
          this.openFileDoc(e)
        }}/>

        <button className='modal__btn' id='verification-first' onClick={(e)=> {
          this.ref.current.click();
        }}>Загрузить</button>

      </div>
    )
  }
}

export default ImageLoad;