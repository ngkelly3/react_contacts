import React/*, { Component }*/ from 'react'

// a component that only has a render method can be simplified into this "stateless" component, in which case we use props alone and don't have to worry about context
function ListContacts(props) {
  return(
    // return an ordered list
    // maps over each contact and display a contact to the view
    <ol className='contact-list'>
      {props.contacts.map((contact) => (
        // why do we need a key here?  Because when we do a map, if we don't have a unique identifier for every key, React runs the risk of updating the entire list upon a state change
        <li key={contact.id} className='contact-list-item'>
          <div className='contact-avatar' style={{
            backgroundImage: `url(${contact.avatarURL})`
          }}/>
          <div className='contact-details'>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
          </div>
          <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
            Remove
          </button>
        </li>
      ))}
    </ol>
  )
}

// A component  that lists the contacts
/*
class ListContacts extends Component {
  render() {
    // this.props contains the object we passed through the component
    // in this case, we passed in the contacts object into the component
    // to access it, we call this.props.contacts and use it as normal
    console.log('Props', this.props)
    return(
      // return an ordered list
      // maps over each contact and display a contact to the view
      <ol className='contact-list'>
        {this.props.contacts.map((contact) => (
          // why do we need a key here?  Because when we do a map, if we don't have a unique identifier for every key, React runs the risk of updating the entire list upon a state change
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`

            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
    )
  }
}
*/

// export line, accessible by App.js
export default ListContacts
