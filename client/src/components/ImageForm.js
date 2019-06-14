import React, { Component } from 'react'
import './../index.css'
import { apiUrl } from './../env'

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: '',
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
        this.setState({ animal: data.name })
      })

  }

  onFilesAdded(event) {
    const file = event.target.file;
    console.log(file)
    this.setState({ file: file })
  }

  handleUpload(event) {
    event.preventDefault();
    const data = new FormData()
    data.append('file', this.state.file)
    data.append('humanName', this.state.humanName)
    return fetch(`${apiUrl}/animal/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
            <p>{this.state.animal}</p>
            <br />
            <input
              type="file"
              name="fileToUpload"
              id="fileToUpload"
              onChange={this.onFilesAdded} />
            <input
              type="button"
              value="Yes"
              onClick={this.props.handleUpload}
              />
          </div>
      </form>
    )
  }
}

export default ImageForm;