import React from 'react'
import PropTypes from 'prop-types'

function ClientList(props) {
    if (!props.clients) return <div />
    return (<div>
        <h4>Clients</h4>
        <ul>
            {props.clients && props.clients.map(c => <li key={c.id}>{c.data.name}</li>)}
        </ul>
    </div>)
}

ClientList.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ClientList
