"use client"
import IsWelcome from '../components/IsWelcome';
import NotWelcome from '../components/NotWelcome';
import { WelcomeProps } from '../components/types';

export default function Welcome() {

    const wizeliner: WelcomeProps = {
        admin: false,
        firstName: 'Thomas',
        lastName: 'Anderson',
        wizecoins: '120',
        IsWizeliner: true
    }

    return (
        <div>
            {wizeliner.IsWizeliner ? <IsWelcome {...wizeliner}/> : <NotWelcome />}
        </div>
    )
}