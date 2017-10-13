import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const BanButton = props => {
    const { username, userId, isLocked, handleBanSubmit } = props;
    console.log('Ban button admin button accessed, given props: ', props);
    console.log('Handle ban submit function populated: ', handleBanSubmit);
    return (
        //Ban button
        <Button
            onClick={ handleBanSubmit }
            block>
            {isLocked ? 'Unban': 'Ban' } {username}
        </Button>
    )
}

// const PromoteButton = props => {
//     const { /*userId,*/ username, isLocked, isAdmin, handlePromoteSubmit } = props;

//     return
//         //User promote button
//         <Button
//             onClick={() => handlePromoteSubmit }
//             disabled={isLocked || isAdmin}
//             block> Promote {username}
//         </Button>
// }

export default BanButton;
