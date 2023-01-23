
import { IImage } from './Home';

const Details: React.FC<IImage> = (props) => {
  const { id, link, description, title, ups, downs, score } = props;
  return (
    <div className='px-96 py-10'>
      <div className='w-full min-w-fit rounded overflow-hidden shadow-lg'>
        <div className='p-3 bg-gray-200'>
          Image {id}
        </div>
        <div className='p-3'>
          <img className='mb-3' src={link} alt='Imgur' />
          <p>Title: {title ? title : 'No title'}</p>
          <p>Description: {description ? description : 'No description'}</p>
          <p>Upvotes: {ups ? ups : 0}</p>
          <p>Downvotes: {downs ? downs : 0}</p>
          <p>Score: {score ? score : 0}</p>
        </div>
      </div>
    </div>
  )
}

export default Details;