import React, { Component } from 'react'
import './../index.css'

class ConsentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: "This is a memorial to the 41,415 plant and animal species" +
        "currently classified as endangered or threated" +
        ". This makes up 27% of all assessed species: 40% of amphibians, 25% of " +
        "mammals, 14% of birds, and 70% of assessed plants. Early this May, the United Nations " +
        "released a report on global biodiversity loss, finding that it is in unprecedented " +
        "decline as a result of human activities.\n\nWould you like to contribute?",
    };
  }

  render() {
    return (
      <form>
        <div>
            <p className="instructions" style={{ whiteSpace: 'pre-wrap' }}>{this.state.instructions}</p>
            <input
              className="instructionsButton"
              type="button"
              value="Yes"
              onClick={() => this.props.handleConsent(1)}
              />
          </div>
      </form>
    )
  }
}

export default ConsentForm;