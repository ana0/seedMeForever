import React, { Component } from 'react'
import './../index.css'
import { apiUrl } from './../env'

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
        console.log(`${apiUrl}/animals`)
        return response.json()
      })
      .then(data => {
        this.setState({ animal: data.name.toLowerCase(), id: data.id })
      })

  }

  onFilesAdded(event) {
    console.log('called file added')
    const file = event.target.files[0];
    console.log(file)
    this.setState({ file, })
  }

  onTextChange(event) {
    const humanName = event.target.value.toLowerCase();
    console.log(humanName)
    this.setState({ humanName })
  }

  handleUpload(event) {
    event.preventDefault();
    const data = new FormData()
    console.log(this.state.file)
    data.append('animal', this.state.file)
    data.append('humanName', this.state.humanName)
    data.append('scientificName', this.state.animal)
    data.append('id', this.state.id)
    console.log(data)
    return fetch(`${apiUrl}/animals/${this.state.id}`, {
      method: 'POST',
      body: data,
    })
    .then(response => {
      console.log(response)
      this.setState({
      })
      return alert('Success! Your discovered animals were submitted')
    })

  }

  render() {
    return (
      <form>
        <div>
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
              value="Yes"
              onClick={this.handleUpload.bind(this)}
              />
          </div>
      </form>
    )
  }
}

export default ImageForm;