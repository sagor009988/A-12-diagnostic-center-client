import { Link } from 'react-router-dom';
import error from '../../assets/404.gif'
const Error = () => {
    return (
        <div className='text-center'>
            <img src={error} alt="" />
            <Link to='/'><button className='btn btn-outline'>Go Back Home</button></Link>
        </div>
    );
};

export default Error;