const dashboard = () => {
      document.location.replace('/');
  };
    
const newPost = () => {
      document.location.replace('/newPost');
  };
    
// const profile = () => {
//       document.location.replace('/profile');
//   };

const login = () => {
    document.location.replace('/login');
};

const signup = () => {
  document.location.replace('/signup');
}; 

document.querySelector('#logger').addEventListener('click', login);
document.querySelector('#signup').addEventListener('click', signup);
// document.querySelector('#profile').addEventListener('click', profile);
document.querySelector('#dashboard').addEventListener('click', dashboard);
document.querySelector('#newPost').addEventListener('click', newPost);