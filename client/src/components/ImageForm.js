import React, { Component } from 'react'
import './../index.css';
import { apiUrl } from './../env';

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: '',
      id: '',
      file: null,
      humanName: ''
    };
  }

  componentDidMount() {
    return fetch(`${apiUrl}/animals`, {
    method: "GET",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }})
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ animal: data.name.toLowerCase(), id: data.id })
      })

  }

  onFilesAdded(event) {
    const file = event.target.files[0];
    this.setState({ file, })
  }

  onTextChange(event) {
    const humanName = event.target.value.toLowerCase();
    this.setState({ humanName })
  }

  handleUpload(event) {
    event.preventDefault();
    const data = new FormData()
    data.append('animal', this.state.file)
    data.append('humanName', this.state.humanName)
    data.append('scientificName', this.state.animal)
    data.append('id', this.state.id)
    return fetch(`${apiUrl}/animals/${this.state.id}`, {
      method: 'POST',
      body: data,
    })
    .then(response => {
      return alert('Success! Your animal was submitted')
    })

  }

  render() {
    return (
      <form>
        <div>
            <p>Your animal is:</p>
            <p>{this.state.animal}</p>
            <br />
            english name: 
            <input
              type="text"
              name="humanName"
              onChange={this.onTextChange.bind(this)} />
            <br />
            <input
              type="file"
              name="animal"
              onChange={this.onFilesAdded.bind(this)} />
            <br />
            <input
              type="button"
              value="Pin"
              onClick={this.handleUpload.bind(this)}
              />
          </div>
      </form>
    )
  }
}

export default ImageForm;