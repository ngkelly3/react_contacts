import React, { Component } from 'react';
import ListContacts from './ListContacts'


class App extends Component {

  state = {
    contacts: [
      {
        "id": "ryan",
        "name": "Ryan Florence",
        "email": "ryan@reacttraining.com",
        "avatarURL": "http://localhost:5001/ryan.jpg"
      },
      {
        "id": "michael",
        "name": "Michael Jackson",
        "email": "michael@reacttraining.com",
        "avatarURL": "http://localhost:5001/michael.jpg"
      },
      {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "email": "tyler@reacttraining.com",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
    ]
  }

  // here we created a function that will remove a contact
  // we pass in the current state to setState, and we filter based on what the current contact.id is
  // basically, we filter the array to include all elements of the state that does not equal the contact that we just clicked.  Pretty cool, right?
  // But how do we get this to ListContacts?  Because it needs to be invoked there.
  // We can pass this into that component as a prop!  Handy.
  removeContact = (contact) => {
    // update the state based on the previous state
    // use setState with no argument to update the state without any dependency on the previous state
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
  }

  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact}
        contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
