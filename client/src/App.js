import { Route, Routes, Navigate } from "react-router-dom";

// import './assets/vendor/bootstrap/css/bootstrap.min.css'
// import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
// import './assets/vendor/boxicons/css/boxicons.min.css'
// import './assets/vendor/quill/quill.snow.css'
// import './assets/vendor/quill/quill.bubble.css'
// import './assets/vendor/remixicon/remixicon.css'
// import './assets/vendor/simple-datatables/style.css'


//  <script src="../src/assets/vendor/apexcharts/apexcharts.min.js"></script> 
//  <script src="../src/assets/vendor/chart.js/chart.min.js"></script> 
//  <script src="../src/assets/vendor/echarts/echarts.min.js"></script> 
//  <script src="../src/assets/vendor/quill/quill.min.js"></script> 
//  <script src="../src/assets/vendor/simple-datatables/simple-datatables-with-basic-5.js"></script> 
//  <script src="../src/assets/vendor/tinymce/tinymce.min.js"></script> 
//  <script src="../src/assets/vendor/php-email-form/validate.js"></script> 

import './assets/css/style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'boxicons/dist/boxicons.min.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'remixicon/fonts/remixicon.css'
import 'simple-datatables/src/style.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'apexcharts/dist/apexcharts.min.js'
import 'chart.js/dist/chart.min.js'
import 'echarts/dist/echarts.min.js'
import 'quill/dist/quill.min.js'
import 'simple-datatables/dist/umd/simple-datatables'
import 'tinymce/tinymce.min.js'

import Index from "./pages/user/Index"
import UserHeader from "./components/user/Header";
import UserFooter from "./components/user/Footer";

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<><Index/><UserHeader/><UserFooter/></>} />
		</Routes>
	);
}

export default App;
