import {useAppSelector} from "store";
import Navbar1 from "components/navbar-1";
import LeftSidebar1 from "components/left-sidebar-1";

export type Layout1Props = {
    children: React.ReactNode;
};

const Layout1: React.FC<Layout1Props> = ({children}) => {
    const config = useAppSelector((state) => state.config);
    const {background, layout, collapsed} = config;

    return (
        <>
            <div
                data-layout={layout}
                data-collapsed={collapsed}
                data-background={background}
                className={`font-sans  text-sm`}>
                <div className="grid min-h-screen grid-rows-header">
                    <Navbar1/>
                    <div className="wrapper">
                        <div className={`flex`}>
                            <LeftSidebar1/>
                            <div className=" grow bg-gray-50">{children}</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
export default Layout1;
