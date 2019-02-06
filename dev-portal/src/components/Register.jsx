// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { register } from 'services/self'
import { confirmMarketplaceSubscription } from 'services/api-catalog'

import { cognitoDomain, cognitoClientId, cognitoAdminDomain, cognitoAdminClientId } from '../services/api'

export default class Register extends React.Component {
  redirectUri = `${window.location.protocol}//${window.location.host}/login`

  userRegister = () => {
    window.location = `${cognitoDomain}/signup?response_type=token&client_id=${cognitoClientId}&redirect_uri=${this.redirectUri}`
  }

  adminRegister = () => {
    window.location = `${cognitoAdminDomain}/signup?response_type=token&client_id=${cognitoAdminClientId}&redirect_uri=${this.redirectUri}`
  }

  render() {
    return this.props.signedIn ? <Redirect to='/apis'/> : (
      <Popup
        inverted
        trigger={this.props.trigger}
        content={
          <div>
            <Button.Group>
              <Button size='mini' onClick={this.adminRegister}>Admin</Button>
              <Button.Or />
              <Button primary size='small' onClick={this.userRegister}>User</Button>
            </Button.Group>
          </div>
        }
        on='click'
        position='bottom right'
        open={ this.props.isOpen }
        onOpen={ () => this.props.handleOpen('register') }
        onClose={ () => this.props.handleClose() }
      />)
    }
}
