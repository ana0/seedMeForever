import React, { Component } from 'react'
import './../index.css'
import { apiUrl } from './../env'

class ConsentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: "There are 41,415 species on the International Union for Conservation " +
        "of Nature’s Red List of Threatened Species, and 16,306 of them are threatened with " +
        "extinction. It makes up 27% of all assessed species, 40% of amphibians, 25% of " +
        "mammals, 14% of birds, and 70% of assessed plants. Early this May, the United Nations " +
        "released a report on global biodiversity loss, finding that it is in unprecedented " +
        "decline as a result of human activities.\n\nAfter absorbing this information … " +
        "before doing anything, before moving forward or trying to build our way out of this " +
        "tragedy, it is important to grieve.\n\nThe Svalbard Global Seed Vault is a highly " +
        "secure seed bank meant to preserve genetic information for future civilizations " +
        "located on a remote island in Norway. Increasingly, it serves as a memorial, but it’s " +
        "not accessible to most people as anything more than an idea. Seed me forever is also " +
        "a kind of monument - but one that is collaborative, local-first, diverse, and resilient" +
        " - to lost and threatened wildlife. It will contain crowdsourced images and genetic " +
        "information of currently threatened and endangered animals.\n\nMuch like the seed " +
        "bank, which is built to withstand many kinds of extreme climate and weather, peer to " +
        "peer protocols are similarly designed to withstand network failures and takedown " +
        "attempts. We'll put our memorial in the safest place we know: all over the world, " +
        "everywhere.\n\nWould you like to participate?",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.public) { alert('Please enter your password!'); return }
    this.handleClick(this.state.currentlySelectedAnimal)
    .then(() => {
      if (this.state.discoveredKeys.length === 0) { alert('No animals to submit!'); return; }
      if (this.state.hasError) { alert('Cannot submit with errors!') }
      else { 
        const data = { edges: this.state.discoveredKeys, private: this.state.private }
        return fetch(`${apiUrl}edges`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
        .then(response => {
          console.log(response)
          this.setState({
            error: '',
            private: '',
            public: '',
            discoveredKeys: [],
            disabled: false
          })
          return alert('Success! Your discovered animals were submitted')
        })
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.instructions}</p>
            <br />
            <input
              type="button"
              value="Yes"
              onClick={this.props.handleConsent}
              />
          </div>
      </form>
    )
  }
}

export default ConsentForm;