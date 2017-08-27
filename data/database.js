import data from './data.json';

const videos = data.map((obj) => {
  const video = {};
  video.id = require('crypto').randomBytes(10).toString('hex');
  video.title = obj.title;
  video.duration = obj.duration;
  video.watched = obj.watched;
  return video;
});

const getVideoById = id => new Promise(resolve => {
  const [video] = videos.filter(video => video.id === id);
  resolve(video);
});
const getVideos = () => new Promise(resolve => resolve(videos));
const createVideo = (({title, duration, watched}) => {
  const video = {
    id: (new Buffer(title, 'utf8')).toString('base64'),
    title, 
    duration, 
    watched
  }
  videos.push(video);
  return video;
});

const getObjectById = (type, id) => {
  const types = {
    video: getVideoById
  };
  return types[type](id);
}

export {
  getVideoById,
  getVideos,
  createVideo,
  getObjectById
};