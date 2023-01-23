import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../lib/uiService';

export interface IFilter {
  section: string,
  sort: string,
  window: string,
  enViral: boolean
}

export interface IImage {
  id?: string,
  link?: string,
  description?: string,
  title?: string,
  ups?: number,
  downs?: number,
  score?: number
}
export interface IHome {
  setDetail: (value: IImage) => void
}
const Home: React.FC<IHome> = (props) => {
  const navigate = useNavigate();
  const { setDetail } = props;
  const [filter, setFileter] = useState<IFilter>({
    section: 'select',
    sort: 'select',
    window: 'select',
    enViral: false
  });
  const [images, setImages] = useState<IImage[]>([]);
  const [items, setItems] = useState<IImage[]>([]);

  useEffect(() => {
    if (images.length > 0) {
      const newItems = images.length >= 20 ? images.slice(0, 20) : images;
      setItems(newItems);
    }
  }, [images])

  useEffect(() => {
    if (filter.section !== 'select') {
      handleSearch();
    }
  }, [filter.enViral])

  const handleSearch = async () => {
    showLoading();
    try {
      const res = await axios(`${process.env.REACT_APP_IMGUR_ENDPOINT}${(filter.section !== 'select') ? `/${filter.section}` : ''}${(filter.sort !== 'select') ? `/${filter.sort}` : ''}${(filter.window !== 'select') ? `/${filter.window}` : ''}?showViral=${filter.enViral}`, {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
        }
      });
      let tempImages: IImage[] = [];
      res.data.data?.forEach(({ title, ups, downs, score, ...data }: any) => {
        if (data.images) {
          data.images.forEach(({ id, description, link, ...img }: any) => {
            if (link.slice(-3) !== 'mp4') {
              tempImages.push({
                id,
                title,
                description,
                link,
                ups,
                downs,
                score
              });
            }
          });
        }
      });
      setTimeout(() => {
        setImages(tempImages);
      }, 200);
    } catch (err) {
      console.log(err);
    }
    hideLoading();
  }
  const dispImg = () => {
    if (images.length > 0) {
      const newItems = images.length >= items.length + 20 ? images.slice(items.length, items.length + 20) : images.slice(items.length);
      setItems([...items, ...newItems]);
    }
  }
  const onClickHandler = (args: IImage) => {
    setDetail(args);
    navigate('/details');
  }
  return (
    <div >
      <div className='fixed top-0 pt-10 w-full px-56 shadow-md bg-white'>
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label>Section</label>
            <Dropdown arrowClosed={<span className="arrow-closed" />} arrowOpen={<span className="arrow-open" />} options={['select', 'hot', 'top', 'user']} value='select' onChange={(e) => setFileter({ ...filter, section: e.value })} />
          </div>
          <div>
            <label>Sort</label>
            <Dropdown disabled={filter.section !== 'user'} options={['select', 'viral', 'top', 'time', 'rising']} value='select' onChange={(e) => setFileter({ ...filter, sort: e.value })} />
          </div>
          <div>
            <label>Window</label>
            <Dropdown disabled={filter.section !== 'top'} options={['select', 'day', 'week', 'month', 'year', 'all']} value='select' onChange={(e) => setFileter({ ...filter, window: e.value })} />
          </div>
        </div>
        <div className='flex justify-between items-center my-2'>
          <div className="flex items-center mb-4">
            <input className='mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2' type='checkbox' onChange={(e) => setFileter({ ...filter, enViral: !filter?.enViral })} disabled={filter.section !== 'user'} />
            <label className="ml-2 text-sm text-gray">Viral images</label>
          </div>
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className='mt-48 px-56'>
        <InfiniteScroll
          dataLength={items.length}
          next={dispImg}
          hasMore={images !== undefined && images.length > items.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center', color: 'gray', fontWeight: 300, fontSize: 20 }}>
              <b>Yay! You have seen it all</b>
            </p>
          }

        >
          <div className='grid grid-cols-3 gap-4'>
            {items && items.map(({ link, description, ...item }: IImage, index: number) => (
              <div key={index} className='p-2 cursor-pointer rounded overflow-hidden shadow-md' onClick={() => onClickHandler({ link, description, ...item })}>
                <img className='object-cover h-48 w-full' src={link} alt='Imgur' />
                <div className='truncate'>{description ? description : 'No description'}</div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

    </div>
  )
}
export default Home;