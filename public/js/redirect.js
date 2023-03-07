

const login = () => {
    document.location.replace('/signup');
};

const signup = () => {
  document.location.replace('/login');
}; 

document.querySelector('#logger').addEventListener('click', login);
document.querySelector('#signup').addEventListener('click', signup);
