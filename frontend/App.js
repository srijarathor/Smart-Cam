import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import CameraScreen from './src/pages/Camera/cam';

const MainNavigator = createStackNavigator(
	{
		Login: {screen: Login},
    Camera_page: {screen: CameraScreen},
    Signup: {screen: Signup},
	}, {
    	initialRouteName: 'Login',
  	}
);
  
const Main = createAppContainer(MainNavigator);

export default Main;