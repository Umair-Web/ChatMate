import React, {useContext} from 'react'
import '../style.scss';
import Addmore from '../images/icons8-add-40.png';

import Messages from './Messages';
import Input from './input';

import { ChatContext } from '../context/ChatContext';
const Chat = () => {

  const {data}=useContext(ChatContext);
  return (
    <div className='Chat'>
      <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className='chatIcons'>
           
            <img src={Addmore} alt="" />
          </div>
     
      </div>
     
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
