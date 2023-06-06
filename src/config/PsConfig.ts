export default class PsConfig {

    static versionNo : String = '1.3';

    ///
    /// API Key to connection with Main Backend
    /// This key must equal with key from backend
    ///
    static apiKey: String = "teampsisthebest";

    ///
    /// Live Mode
    /// ------------
    /// If you want to upload to server, please enable below and comment Development below
    ///
    static fixedDomain: String = "https://products.panacea-soft.co/flutter-buysell-demo"; 
    static domain: String = "https://products.panacea-soft.co/flutter-buysell-demo"; 

    ///
    /// Development Mode
    /// -----------------
    /// Before upload to server, please comment this 2 lines.
    ///
    // static fixedDomain: String = "https://products.panacea-soft.co/flutter-buysell-demo";    
    // static domain: String = "http://localhost:3000";

    ///
    /// Firebase Config
    ///
    static firebaseConfig = {
        apiKey: "000000000000000000000000000000000000000",
        authDomain: "flutter-buy-and-sell.firebaseapp.com",
        databaseURL: "https://flutter-buy-and-sell.firebaseio.com",
        projectId: "flutter-buy-and-sell",
        storageBucket: "flutter-buy-and-sell.appspot.com",
        messagingSenderId: "000000000000",
        appId: "1:000000000000:web:0000000000000000000000",
        measurementId: "G-0000000000"            
    };
    
    // static firebaseConfig = {
    //     apiKey: "AIzaSyCtBHbqTWRgh9O8veCOJNnCMG56lXTdGJw",
    //     authDomain: "flutter-buy-and-sell.firebaseapp.com",
    //     databaseURL: "https://flutter-buy-and-sell.firebaseio.com",
    //     projectId: "flutter-buy-and-sell",
    //     storageBucket: "flutter-buy-and-sell.appspot.com",
    //     messagingSenderId: "505384053995",
    //     appId: "1:505384053995:web:f22081b8b835af474ae2ae",
    //     measurementId: "G-2CNXCDNZ2Y"
    // };
    
    ///
    /// Base URL * Don't update it *
    ///
    static base: String = PsConfig.domain; 
    static baseUrl: String = PsConfig.domain + '/index.php';
    static fixedPath : String = PsConfig.fixedDomain;
 
    /// 
    /// Debug Mode
    ///
    static isDebugMode : Boolean = true;

    /// Is Demo
    ///
    static is_demo : Boolean = true;

    static item_upload_ui1 : Boolean = false;

    static item_upload_ui2 : Boolean = true;
}
