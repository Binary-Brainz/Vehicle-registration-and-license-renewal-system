import React from 'react';
import Notifications from "react-notifications-menu"

const ViewVehicles = ( ) =>{
   const data = [
      {
        image :'https://synergi-dev.s3.ap-southeast-1.amazonaws.com/profile-pictures/6b9.png' ,
        message : 'Lorem ipsum dolor sit amet.',
        detailPage : '/events', 
        receivedTime:'12h ago'
      }
   ];

   return(
    <Notifications 
        data={data} 
        height='500px'
        width='300px'
        classNamePrefix='okrjoy'
        cardOption={data => console.log(data)}
        viewAllbtn={{ text: 'see all', linkTo: '/seeAll' }}
        markAsRead={data => console.log(data)}
        headerBackgroundColor = 'red'
        header={
          {
            title: 'Notifications',
            option: { text: 'View All', onClick: () => {} }
          }
        }
    />
   );
}


export default ViewVehicles;