import { BrowserRouter, Routes,Route } from 'react-router-dom';
import logo from './logo.svg';
import './styles/App.css';
import ExplorePage from './ExplorePage';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ExpandedPost from './ExpandedPost';
import FollowingPage from './FollowingPage';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import NotificationPage from './NotificationPage';
import ChatPage from './ChatPage';
import ConversationPage from './ConversationPage';
import MakePost from './MakePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/explore" element = {<ExplorePage/>} />
        <Route path = "/" element = {<LoginPage/>}/>
        <Route path = "/Register" element = {<RegisterPage/>} />
        <Route path = "/ExpandedPost" element = {<ExpandedPost/>} />
        <Route path = "/Following" element = {<FollowingPage/>} />
        <Route path = "/Search" element = {<SearchPage/>} />
        <Route path = "/Profile" element = {<ProfilePage/>} />
        <Route path = "/Notification" element = {<NotificationPage/>} />
        <Route path = "/Chat" element = {<ChatPage/>} />
        <Route path = "/Conversation" element = {<ConversationPage/>} />
        <Route path = "/MakePost" element = {<MakePost/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
