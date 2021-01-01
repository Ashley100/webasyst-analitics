
import Header from "../header/header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";

const MainLayout = ({children, props}) => {

    console.log(props.sidebar);

    return (
        <div id="app-root" className="docs-root bp3-dark">

            <Header />

            <main className={`container-large`}>

                <div className={isSidebar(props.sidebar) ? `with-left-sidebar` : 'without-sidebar'}>

                    {isSidebar(props.sidebar) && <Sidebar />}

                    {children}

                </div>

            </main>

            <Footer />
        </div>
    )
};

const isSidebar = sidebar => {
    if (sidebar) {
        if(sidebar.left === false) return false;
    } else return true
};

export default MainLayout;