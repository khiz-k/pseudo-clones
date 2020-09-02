import React from 'react';
import {Subscription} from "./Subscription/Subscription";
import {Divider} from "semantic-ui-react";
import {SideBarHeader} from '../SideBarHeader/SideBarHeader';

export class Subscriptions extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideBarHeader title='Subscriptions'/>
        <Subscription label='Channel A' broadcasting/>
        <Subscription label='Channel B' amountNewVideos={10}/>
        <Subscription label='Channel C' amountNewVideos={23}/>
        <Subscription label='Channel D' amountNewVideos={4}/>
        <Subscription label='Channel E' amountNewVideos={114}/>
        <Divider/>
      </React.Fragment>
    );
  }
}