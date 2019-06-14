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
        this.setState({ animal: data.name, id: data.id })
      })

  }

  onFilesAdded(event) {
    console.log('called file added')
    const file = event.target.files[0];
    console.log(file)
    this.setState({ file, })
  }

  handleUpload(event) {
    event.preventDefault();
    const data = new FormData()
    console.log(this.state.file)
    data.append('animal', this.state.file)
    data.append('humanName', this.state.humanName)
    console.log(data)
    return fetch(`${apiUrl}/animals/${this.state.id}`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
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