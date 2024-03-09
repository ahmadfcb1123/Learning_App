import 'bootstrap/dist/css/bootstrap.min.css';

import Register from "../src/sign_in/Register";
import Login from "../src/sign_in/Login";
import StudentLogin from "./sign_in/StudentLogin";
import Home from "./components/Home/Home";
import Skills from "./components/Home/Skills";
import {BrowserRouter, Routes} from "react-router-dom";
import { Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Grammer from "./components/Skills/Grammer";
import Lestening from "./components/Skills/Listeneing";
import MultiplQeuestion from "./Question/MultiplQeuestion";
import MatchQuestion from "./Question/MatchQuestion";
import Game from "./SimpleGame/Game";
import Practice from "./components/practices/practice";
import PracticeChapter from "./components/practices/PracticeChapter";
import SkillsPractice from "./components/practices/SkillsPractice";
import StudentRegister from "./sign_in/StudentRegister";
import Welcom from "./sign_in/Welcom";
import PracticeDetail from "./components/practices/PracticeDetails";
import HomeParent from "./components/Home/HomeParent";
import PracticeTest from "./components/practices/PracticeTest";
import ReorderTest from "./Question/ReorderTest";
import Reading from "./components/Skills/Reading";
import Hero from "./3DHomepage/Hero";
import HomePage from "./3DHomepage/HomePage";
import Speaking from "./components/Skills/Speaking";
import PracticeGroup from "./components/practices/PracticeGroup";
import SpeakingDetails from "./components/practices/SpeakingDetails";
import Vocabs from "./components/vocabulary/Vocabs";
import SkillsAndVocabs from "./components/Home/SkillsAndVocabs";
import GrammerDetails from "./components/vocabulary/GrammerDetails";
import Profile from "./components/profile/Profile";
import GamaTest from "./SimpleGame/GamaTest";


import GameLogin from "./SimpleGame/GameLogin";
import Competition from "./SimpleGame/Competition";
import JoinGame from "./SimpleGame/JoinGame";
import Hosting from "./SimpleGame/Hosting";
import Writing from "./components/Skills/Writing";
import LookAndWrite from "./Question/LookAndWrite";
import SignIn from "./components/Header/SignIn";
import Paperbase from "./admin/Paperbase";
import Chapters from "./admin/pages/Chapters";
import LesteningQuestion from "./admin/pages/LesteningQuestion";
import WritingQuestion from "./admin/pages/WritingQuestion";
import ReadingQuestion from "./admin/pages/ReadingQuestion";
import GrammerQuestion from "./admin/pages/GrammerQuestion";
import SpeakingQuestion from "./admin/pages/SpeakingQuestion";
import Vocabularies from "./admin/pages/Vocabularies";
import Grammers from "./admin/pages/Grammers";
import WelcomPage from "./3DHomepage/WelcomPage";
import Employee from './admin/pages/example/Employee';
import Addproduct from './admin/pages/example/ChapterSection/Addproduct';
import EditProduct from './admin/pages/example/ChapterSection/EditProduct';
import Productlist from './admin/pages/example/ChapterSection/Productlist';
import VocabsList from './admin/pages/example/vocabsSection/VocabsList';
import AddVocabs from './admin/pages/example/vocabsSection/AddVocabs';
import GrammerList from './admin/pages/example/GrammerSection/GrammerList';
import ChooseGame from './SimpleGame/ChooseGame';
import AddGrammer from './admin/pages/example/GrammerSection/AddGrammer';
import ChaptersPage from './admin/pages/example/welcomChapter/ChaptersPage';
import AddGrammerQuestion from './admin/pages/example/GrammerQuestion/AddGrammerQuestion';
import SkillPage from './admin/pages/example/welcomChapter/SkillPage';
import GrammerQuestionList from './admin/pages/example/GrammerQuestion/GrammerQuestionList';
import AddGrammerMultipleChoices from './admin/pages/example/GrammerQuestion/AddGrammerMultipleChoices';
import Reality from './components/vocabulary/Reality';
import Test from './components/SpeachtoText/Test';
import FinalChat from './Chat/FinalChat';
import ChatHosting from './Chat/ChatHosting';
import CreateRoom from './Chat/CreateRoom';
import JoinRoom from './Chat/JoinRoom';
import StartChat from './Chat/StartChat';
import Song from './components/Song/Song';

function App() {
  return (
    <>
    <BrowserRouter>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" Component={HomePage} exact />
        <Route path="/login" Component={Login}/>
        <Route path="/skills" Component={Skills} />
        <Route path="/welcom" Component={Welcom} />
        <Route path="/home" Component={Home} />
        <Route path="/register" Component={Register} /> 
        <Route path="/childRegister" Component={StudentRegister}/>
        <Route path="/childLogin" Component={StudentLogin}/>
        <Route path="/ChoiseQuestion" Component={MultiplQeuestion} /> 
        <Route path="/ReorderTest" Component={ReorderTest}/>
        <Route path="/MatchQuestion" Component={MatchQuestion} /> 
        <Route path="/LookAndWrite" Component={LookAndWrite} /> 
        <Route path="/grammer" Component={Grammer}/>
        <Route path="/lestining" Component={Lestening}/>
        <Route path="/Reading" Component={Reading}/>
        <Route path="/Speaking" Component={Speaking}/>
        <Route path="/Writing" Component={Writing}/>
        <Route path="/game" Component={Game}/>
        <Route path="/test" Component={Test}/>
        <Route path="/practic" Component={Practice}/>
        <Route path="/chapterPractice" Component={PracticeChapter}/>
        <Route path="/skillsPractice" Component={SkillsPractice}/>
        <Route path="/practiceDetails" Component={PracticeDetail}/>
        <Route path="/childs" Component={HomeParent}/>
        <Route path="/PracticeTest" Component={PracticeTest}/>
        <Route path="/HomePageTest" Component={HomePage}/>
        <Route path="/practiceGroup" Component={PracticeGroup}/>
        <Route path="/speakingPractice" Component={SpeakingDetails}/>
        <Route path="/vocabulary" Component={Vocabs}/>
        <Route path="/reality" Component={Reality}/>
        <Route path="/SkillsAndVocabs" Component={SkillsAndVocabs}/>
        <Route path="/grammerDetail" Component={GrammerDetails}/>
        <Route path="/GamaTest" Component={GamaTest}/>
        <Route path="/profile" Component={Profile}/>
        <Route path="/WelcomPage" Component={WelcomPage}/>

        <Route path="/GameLogin" Component={localStorage.getItem('access_token')==null ?Login: GameLogin}/>
        <Route path="/Competition" Component={localStorage.getItem('access_token')==null ?Login: Competition}/>
        <Route path="/JoinGame" Component={localStorage.getItem('access_token')==null ?Login: JoinGame}/>
        <Route path="/Hosting" Component={localStorage.getItem('access_token')==null ?Login: Hosting}/>
        <Route path="/ChooseGame" Component={localStorage.getItem('access_token')==null ?Login: ChooseGame}/>
        <Route path="/SignIn" Component={localStorage.getItem('access_token')==null ?Login: SignIn}/>

        <Route path="/Admin" Component={Paperbase}/>
        <Route path="/chapters-page" Component={Productlist}/>
        <Route path="/listeningquestion-page" Component={ChaptersPage}/>
        <Route path="/readingquestion-page" Component={ChaptersPage}/>
        <Route path="/writingquestion-page" Component={ChaptersPage}/>
        <Route path="/grammarquestion-page" Component={ChaptersPage}/>
        <Route path="/speakingquestion-page" Component={ChaptersPage}/>
        <Route path="/vocabulary-page" Component={VocabsList}/>
        <Route path="/grammar-page" Component={GrammerList}/>        
        <Route path="/employee" Component={Employee}/>
        <Route path="/add" Component={Addproduct}/>
        <Route path="editproduct" Component={EditProduct}/>
        <Route path="addVocabs" Component={AddVocabs}/>
        <Route path="AddGrammer" Component={AddGrammer}/>
        <Route path="ChaptersPage" Component={ChaptersPage}/>
        <Route path="SkillPage" Component={SkillPage}/>
        <Route path="AddGrammerQuestion" Component={AddGrammerQuestion}/>
        <Route path="GrammerQuestionList" Component={GrammerQuestionList}/>
        <Route path="AddGrammerMultipleChoices" Component={AddGrammerMultipleChoices}/>
        <Route path="FinalChat" Component={FinalChat}/>
        <Route path="ChatHosting" Component={ChatHosting}/>
        <Route path="CreateRoom" Component={CreateRoom}/>
        <Route path="JoinRoom" Component={JoinRoom}/>
        <Route path="StartChat" Component={StartChat}/>
        <Route path="Song" Component={Song}/>
        {/* <Route path="productlist" Component={Productlist}/> */}

        <Route Component={NotFound} /> 
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
